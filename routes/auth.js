const express = require('express')
const router = express.Router()
const {register, login, registerPost, loginPost, logout} = require('../controllers/auth')

router.route('/register').get(register).post(registerPost)
router.route('/login').get(login).post(loginPost)
router.get('/logout', logout)


module.exports = router