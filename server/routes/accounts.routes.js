const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const Account = require('../models/account.model')

// Endpoints
router.post('/newAccount', ensureLoggedIn(),(req, res) => {

    Account
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editAccount/:account_id', (req, res) => {

    const accountId = req.params.account_id

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Account
        .findByIdAndUpdate(accountId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserAccounts/:user_id', (req, res) => {

    const userId = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Account
        .find({ userOwner: userId })
        .populate('type')
        .populate('currency')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneAccount/:account_id', (req, res) => {

    const accountId = req.params.account_id

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Account
        .findById(accountId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.delete('/deleteAccount/:account_id', ensureLoggedIn(), (req, res) => {

    const accountId = req.params.account_id

    Account
        .findByIdAndDelete(accountId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 

})

module.exports = router