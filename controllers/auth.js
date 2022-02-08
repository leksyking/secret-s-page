const User = require('../models/secrets')
const passport = require('passport')

//Get Route
const register = (req, res) => {
  res.status(200).render('register') 
}
const login = (req, res) => {
  res.status(200).render('login')  
}

//Post route
const registerPost = async (req, res) => {
    // Using Passport for authentication to register users
     await  User.register(new User({username: req.body.username}), req.body.password)
     passport.authenticate('local')(req, res, () => {
         res.redirect('/secret');
        })
}
const loginPost = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  
  req.login(user, (err)=>{
    if(err){
        console.log(err);
    }else{
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/secret");
        });
    }
  })
}


const logout = async (req, res) => {
    req.logout()
    res.redirect('/auth/login')
}

module.exports = {
    register,
    login,
    registerPost,
    loginPost,
    logout
}







