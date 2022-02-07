const Secret = require('../models/submittedsecrets')

const home = (req, res) => {
    res.status(200).render('home')  
}
const submit = async (req, res) => {
    res.render("submit");    
}

const secret = async (req, res) => {
    const secret = await Secret.find({})
    res.render('secrets', {secrets: secret}) 
}

const submitPost = async (req, res) => {
    const secret = await Secret.create(req.body)
    res.redirect('/secret')
}


module.exports = {
    home,
    submit,
    secret,
    submitPost
}