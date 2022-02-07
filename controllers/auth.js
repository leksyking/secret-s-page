const User = require('../models/secrets')


//Get Route
const register = (req, res) => {
  res.status(200).render('register') 
}
const login = (req, res) => {
  res.status(200).render('login')  
}

//Post route
const registerPost = async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).redirect('/secret')
 }
const loginPost = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
      console.log("Please enter an email and Password");
    }
    const user = await User.findOne({email})
    if(!user){
      console.log("User doesn't exist");
    }
    const isPassword = user.comparePassword(password)
    if(!isPassword){
      console.log("Wrong Password");
    }
    res.status(200).redirect('/secret')

}


const logout = async (req, res) => {
    res.redirect('/auth/login')
}

module.exports = {
    register,
    login,
    registerPost,
    loginPost,
    logout
}







