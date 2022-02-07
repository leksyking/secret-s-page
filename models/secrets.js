const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: 1
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid email']
      }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.comparePassword = async function(enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword, this.password)
    return isMatch
}


const User = mongoose.model('User', userSchema)
module.exports = User