// Seed script for local development.
// Usage: node seeds/seed.js [username]
// Idempotent: global catalogs are upserted by key; per-user data is only
// created when the target user has no accounts yet.
require('dotenv').config()
const mongoose = require('mongoose')

const Currency = require('../models/currency.model')
const AccountTypes = require('../models/accountType.model')
const Category = require('../models/category.model')
const Account = require('../models/account.model')
const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')

const CURRENCIES = [
    { country: 'United States', currency: 'US Dollar', code: 'USD', symbol: '$' },
    { country: 'Argentina', currency: 'Argentine Peso', code: 'ARS', symbol: '$' },
    { country: 'Eurozone', currency: 'Euro', code: 'EUR', symbol: '€' },
    { country: 'United Kingdom', currency: 'British Pound', code: 'GBP', symbol: '£' },
]

const ACCOUNT_TYPES = [
    { name: 'Regular', description: 'Day-to-day spending account' },
    { name: 'Debt', description: 'Credit card or loan' },
    { name: 'Savings', description: 'Long term savings' },
]

const CATEGORIES = [
    { name: 'Salary', type: 'income', color: '#4caf50' },
    { name: 'Freelance', type: 'income', color: '#8bc34a' },
    { name: 'Groceries', type: 'expense', color: '#f44336' },
    { name: 'Rent', type: 'expense', color: '#e91e63' },
    { name: 'Transport', type: 'expense', color: '#ff9800' },
    { name: 'Entertainment', type: 'expense', color: '#9c27b0' },
    { name: 'Health', type: 'expense', color: '#00bcd4' },
]

const daysAgo = n => {
    const d = new Date()
    d.setDate(d.getDate() - n)
    return d
}

async function seed() {
    const username = process.argv[2]

    // 1. Global catalogs (upsert by key)
    for (const c of CURRENCIES) {
        await Currency.updateOne({ code: c.code }, c, { upsert: true })
    }
    console.log(`currencies: ensured ${CURRENCIES.length}`)

    for (const t of ACCOUNT_TYPES) {
        await AccountTypes.updateOne({ name: t.name }, t, { upsert: true })
    }
    console.log(`accounttypes: ensured ${ACCOUNT_TYPES.length}`)

    // 2. Target user
    const user = username
        ? await User.findOne({ username })
        : await User.findOne().sort({ createdAt: 1 })

    if (!user) {
        throw new Error(
            username
                ? `No user found with username "${username}". Sign up in the app first.`
                : 'No users found in the database. Sign up in the app first, then run the seed again.'
        )
    }
    console.log(`seeding data for user: "${user.username}"`)

    // 3. Per-user data (skip when already seeded)
    const existingAccounts = await Account.find({ userOwner: user._id })
    if (existingAccounts.length > 0) {
        console.log('accounts already exist for this user - skipping user data')
        return
    }

    const [types, currencies] = await Promise.all([
        AccountTypes.find(),
        Currency.find(),
    ])
    const typeByName = name => types.find(t => t.name === name)._id
    const currencyByCode = code => currencies.find(c => c.code === code)._id

    const categoryDocs = await Category.insertMany(
        CATEGORIES.map(c => ({ ...c, userOwner: user._id }))
    )
    const categoryByName = name => categoryDocs.find(c => c.name === name)._id
    console.log(`categories: created ${categoryDocs.length}`)

    const accountDocs = await Account.insertMany([
        {
            name: 'Cash (EUR)',
            type: typeByName('Regular'),
            initialAmount: 5000,
            amount: 5000,
            currency: currencyByCode('EUR'),
            color: '#ff9800',
            userOwner: user._id,
        },
        {
            name: 'Main bank account',
            type: typeByName('Regular'),
            initialAmount: 1200,
            amount: 1200,
            currency: currencyByCode('EUR'),
            color: '#3f51b5',
            userOwner: user._id,
        },
        {
            name: 'Emergency fund',
            type: typeByName('Savings'),
            initialAmount: 3000,
            amount: 3000,
            currency: currencyByCode('EUR'),
            color: '#4caf50',
            userOwner: user._id,
        },
        {
            name: 'Credit card',
            type: typeByName('Debt'),
            initialAmount: -350,
            amount: -350,
            currency: currencyByCode('EUR'),
            color: '#f44336',
            userOwner: user._id,
        },
    ])
    const accountByName = name => accountDocs.find(a => a.name === name)._id
    console.log(`accounts: created ${accountDocs.length}`)

    const T = (amount, days, description, type, category, account) => ({
        amount,
        date: daysAgo(days),
        description,
        type,
        category: categoryByName(category),
        account: accountByName(account),
        userOwner: user._id,
    })

    const transactions = [
        T(2500, 60, 'Monthly salary', 'income', 'Salary', 'Main bank account'),
        T(2500, 30, 'Monthly salary', 'income', 'Salary', 'Main bank account'),
        T(450, 55, 'Freelance project', 'income', 'Freelance', 'Main bank account'),
        T(-120, 50, 'Weekly groceries', 'expense', 'Groceries', 'Cash (EUR)'),
        T(-85, 45, 'Weekly groceries', 'expense', 'Groceries', 'Cash (EUR)'),
        T(-400, 40, 'Rent payment', 'expense', 'Rent', 'Main bank account'),
        T(-30, 35, 'Subway card top-up', 'expense', 'Transport', 'Cash (ARS)'),
        T(-60, 28, 'Cinema and dinner', 'expense', 'Entertainment', 'Credit card'),
        T(-95, 20, 'Pharmacy', 'expense', 'Health', 'Credit card'),
        T(-140, 15, 'Weekly groceries', 'expense', 'Groceries', 'Cash (EUR)'),
        T(-25, 10, 'Bus pass', 'expense', 'Transport', 'Cash (EUR)'),
        T(-45, 5, 'Streaming subscription', 'expense', 'Entertainment', 'Credit card'),
    ]
    await Transaction.insertMany(transactions)
    console.log(`transactions: created ${transactions.length}`)
}

mongoose
    .connect(process.env.DB_REMOTE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(seed)
    .then(() => {
        console.log('Seed completed ✔')
        mongoose.disconnect()
    })
    .catch(err => {
        console.error('Seed failed:', err.message)
        mongoose.disconnect()
        process.exit(1)
    })
