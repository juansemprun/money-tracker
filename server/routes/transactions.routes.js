const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Transaction = require('../models/transaction.model')

// Endpoints
router.post('/newTransaction', (req, res) => {

    Transaction
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserTransactions/:user_id', (req, res) => {

    const userId = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Transaction
        .find({ userOwner: userId })
        .populate([
            {
                path: 'account',
                model: 'Account',
                select: 'name amount currency',
                populate: {
                    path: 'currency',
                    model: 'Currency',
                    select: 'symbol'
                }
            }
        ])
        .populate('category')
        .populate('userOwner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTransactionsByCategory/:category_id', (req, res) => {

    const categoryId = req.params.category_id

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Transaction
        .find({ category: categoryId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTransactionsByAccount/:account_id', (req, res) => {

    const accountId = req.params.account_id

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Transaction
        .find({ account: accountId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editTransaction/:transaction_id', (req, res) => {

    const transactionId = req.params.transaction_id

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Transaction
        .findByIdAndUpdate(transactionId, req.body)
        .populate('category')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteTransaction/:transaction_id', (req, res) => {

    const transaction_id = req.params.transaction_id

    Transaction
        .findByIdAndDelete(transaction_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router