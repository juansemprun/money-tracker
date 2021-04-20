const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const Category = require('../models/category.model')

// Endpoints
router.post('/newCategory', (req, res, next) => {

    Category
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCategory/:category_id', (req, res) => {

    const categoryId = req.params.category_id

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Category
        .findByIdAndUpdate(categoryId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserCategories/:user_id', (req, res) => {

    const userId = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Category
        .find({ userOwner: userId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneCategory/:category_id', (req, res) => {

    const categoryId = req.params.category_id

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Category
        .findById(categoryId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Get user categories by type
router.get('/getUserCategoriesByType/:category_type', (req, res) => {

    const categoryType = req.params.category_type
    const userId = req.query.userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Category
        .find({ type: categoryType, userOwner: userId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteCategory/:category_id', ensureLoggedIn(), (req, res) => {

    const categoryId = req.params.category_id

    Category
        .findByIdAndDelete(categoryId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router