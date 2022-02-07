const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: 1
    },
    password: {
        type: String
        }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)
module.exports = User