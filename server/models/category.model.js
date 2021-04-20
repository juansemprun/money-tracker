const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['expense', 'income']
    },
    color: {
        type: String,
        required: true,
        default: '#0099cc'
    },
    icon: {
        type: String
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category