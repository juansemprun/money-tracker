const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'AccountTypes',
        required: true
    },
    initialAmount: {
        type: Number,
        required: true,
        default: 0
    },
    amount: {
        type: Number
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency',
        required: true
    },
    color: {
        type: String,
        required: true,
        default: '#0099cc'
    },
    image: {
        type: String
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account