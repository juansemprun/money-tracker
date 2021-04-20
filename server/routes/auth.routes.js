const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")

const salt = bcrypt.genSaltSync(10)

router.post("/signup", (req, res) => {

    const { name, username, password } = req.body

    if (!name || !username || !password) {
        res.status(400).json({ message: 'Empty fields' })
        return
    }

    // Password validation
    if (password.length < 2) {
        res.status(400).json({ message: 'Weak password' })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.status(400).json({ message: 'Username taken' })
                return
            }

            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ name, username, password: hashPass })
                .then(userCreated => {

                    req.login(userCreated, (err) => {

                        if (err) {
                            res.status(500).json({ message: 'Login error' })
                            return
                        }

                        res.status(200).json(userCreated)

                    })

                })
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
            
        })
        .catch(() => res.status(500).json({ message: "Username check error" }))
})

router.post('/login', (req, res) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Error authenticating user' })
            return
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        // save user in session (req.user)
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session error' })
                return
            }
            
            res.status(200).json(theUser)
        })
    })(req, res)
})

router.put('/editProfile/:user_id', (req, res) => {

    const userId = req.params.user_id
    const { name, username, password } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    const hashPass = bcrypt.hashSync(password, salt)

    if (password) {
        User
            .findByIdAndUpdate(userId, { name, username, password: hashPass })
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))
    } else {

        User
            .findByIdAndUpdate(userId, { name, username })
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))
    }
})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' })
})

router.get('/loggedin', (req, res) => {

    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return
    }

    res.status(403).json({ message: 'Unauthorized' })
    
})

module.exports = router