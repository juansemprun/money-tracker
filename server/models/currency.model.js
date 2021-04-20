const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currencySchema = new Schema({
    country: {
        type: String,
        trim: true
    },
    currency: {
        type: String,
        trim: true
    },
    code: {
        type: String,
    },
    symbol: {
        type: String
    }
}, {
    timestamps: true
})

const Currency = mongoose.model('Currency', currencySchema)
module.exports = Currency