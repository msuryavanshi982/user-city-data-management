const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    ID: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mediaUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("user", userSchema)