const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const AccountType = require('../models/accountType.model')

// Endpoints
router.post('/newAccountType', ensureLoggedIn(), (req, res) => {

    AccountType
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 
})

router.put('/editAccountType/:account_type_id', ensureLoggedIn(), (req, res) => {

    const accountTypeId = req.params.account_type_id

    if (!mongoose.Types.ObjectId.isValid(accountTypeId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    AccountType
        .findByIdAndUpdate(accountTypeId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getAllAccountTypes', ensureLoggedIn(), (req, res) => {

    AccountType
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 
})

router.delete('/deleteAccountType/:account_type_id', ensureLoggedIn(), (req, res) => {

    const accountTypeId = req.params.account_type_id

    AccountType
        .findByIdAndDelete(accountTypeId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 
})

module.exports = router