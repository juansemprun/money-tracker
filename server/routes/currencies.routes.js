const express = require('express')
const router = express.Router()

const Currency = require('../models/currency.model')

// Endpoints
router.get('/getAllCurrencies', (req, res) => {

    Currency
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 
})

module.exports = router