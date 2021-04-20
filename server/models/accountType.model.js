const mongoose = require('mongoose');
const Schema = mongoose.Schema

const accountTypeSchema = new Schema({
    name: {
        type: String,
        enum: ['Regular', 'Debt', 'Savings']
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})


const AccountTypes = mongoose.model('AccountTypes', accountTypeSchema)

module.exports = AccountTypes