const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const User = require("../models/user.model")

router.get('/getUserProfile/:user_id', ensureLoggedIn() , (req, res) => {

    const userId = req.params.user_id
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User
        .findById(userId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err)) 
})

module.exports = router