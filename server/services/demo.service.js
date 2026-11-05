// Demo user for exhibition mode: ensures the base catalogs exist, then
// creates (once) a "demo" user with six months of plausible financial
// history. Idempotent: repeated calls never duplicate data.
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const Currency = require('../models/currency.model')
const AccountTypes = require('../models/accountType.model')
const Category = require('../models/category.model')
const Account = require('../models/account.model')
const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')

const DEMO_USERNAME = 'demo'

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

const round2 = n => Math.round(n * 100) / 100

const rand = (min, max) => round2(min + Math.random() * (max - min))

async function ensureCatalogs() {
    for (const c of CURRENCIES) {
        await Currency.updateOne({ code: c.code }, c, { upsert: true })
    }
    for (const t of ACCOUNT_TYPES) {
        await AccountTypes.updateOne({ name: t.name }, t, { upsert: true })
    }
}

function buildTransactions(categoryByName, accountByName, user) {
    const txs = []
    const tx = (amount, date, description, type, category, account) => ({
        amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        date,
        description,
        type,
        category: categoryByName(category),
        account: accountByName(account),
        userOwner: user._id,
    })

    // Six months of history, day by day
    for (let d = 180; d >= 0; d--) {
        const date = daysAgo(d)
        const dom = date.getDate()
        const dow = date.getDay()

        if (dom === 1) {
            txs.push(tx(2500, date, 'Monthly salary', 'income', 'Salary', 'Main bank account'))
        }
        if (dom === 15 && Math.random() < 0.5) {
            txs.push(tx(rand(250, 700), date, 'Freelance project', 'income', 'Freelance', 'Main bank account'))
        }
        if (dom === 2) {
            txs.push(tx(400, date, 'Rent payment', 'expense', 'Rent', 'Main bank account'))
        }
        if (dow === 6) { // Saturdays: groceries
            txs.push(tx(rand(70, 130), date, 'Weekly groceries', 'expense', 'Groceries', 'Cash (EUR)'))
        }
        if (dow === 1) { // Mondays: transport
            txs.push(tx(rand(15, 35), date, 'Bus pass', 'expense', 'Transport', 'Cash (EUR)'))
        }
        if (dow === 5 && Math.random() < 0.6) { // Some Fridays out
            txs.push(tx(rand(25, 80), date, 'Dinner and drinks', 'expense', 'Entertainment', 'Credit card'))
        }
        if (dom === 20 && Math.random() < 0.4) {
            txs.push(tx(rand(30, 120), date, 'Pharmacy', 'expense', 'Health', 'Credit card'))
        }
        if (dom === 10) {
            txs.push(tx(rand(8, 20), date, 'Streaming subscription', 'expense', 'Entertainment', 'Credit card'))
        }
    }
    return txs
}

async function seedDemoData(user) {
    const [types, currencies] = await Promise.all([AccountTypes.find(), Currency.find()])
    const typeByName = name => types.find(t => t.name === name)._id
    const currencyByCode = code => currencies.find(c => c.code === code)._id

    const categoryDocs = await Category.insertMany(
        CATEGORIES.map(c => ({ ...c, userOwner: user._id }))
    )
    const categoryByName = name => categoryDocs.find(c => c.name === name)._id

    const accountDocs = await Account.insertMany([
        {
            name: 'Cash (EUR)',
            type: typeByName('Regular'),
            initialAmount: 500,
            amount: 500,
            currency: currencyByCode('EUR'),
            color: '#ff9800',
            userOwner: user._id,
        },
        {
            name: 'Main bank account',
            type: typeByName('Regular'),
            initialAmount: 3200,
            amount: 3200,
            currency: currencyByCode('EUR'),
            color: '#3f51b5',
            userOwner: user._id,
        },
        {
            name: 'Emergency fund',
            type: typeByName('Savings'),
            initialAmount: 8000,
            amount: 8000,
            currency: currencyByCode('EUR'),
            color: '#4caf50',
            userOwner: user._id,
        },
        {
            name: 'Credit card',
            type: typeByName('Debt'),
            initialAmount: -850,
            amount: -850,
            currency: currencyByCode('EUR'),
            color: '#f44336',
            userOwner: user._id,
        },
    ])
    const accountByName = name => accountDocs.find(a => a.name === name)._id

    const txs = buildTransactions(categoryByName, accountByName, user)
    await Transaction.insertMany(txs)
    return { categories: categoryDocs.length, accounts: accountDocs.length, transactions: txs.length }
}

async function ensureDemoUser() {
    await ensureCatalogs()

    let user = await User.findOne({ username: DEMO_USERNAME })
    if (!user) {
        user = await User.create({
            name: 'Demo User',
            username: DEMO_USERNAME,
            // Unusable password: nobody can log in with it as a normal user
            password: bcrypt.hashSync(crypto.randomBytes(24).toString('hex'), 10),
        })
    }

    const existingAccounts = await Account.countDocuments({ userOwner: user._id })
    if (existingAccounts === 0) {
        await seedDemoData(user)
    }
    return user
}

module.exports = { ensureDemoUser, DEMO_USERNAME }
