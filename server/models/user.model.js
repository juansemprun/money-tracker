const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        require: true,
        default: 'https://www.sogapar.info/wp-content/uploads/2015/12/default-user-image.png'
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User