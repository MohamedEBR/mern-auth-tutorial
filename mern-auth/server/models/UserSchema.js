// Module import
const mongoose = require('mongoose')


// Schema Set up
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// Model Setup
const User = mongoose.model('User', UserSchema)

// Export
module.exports = User;