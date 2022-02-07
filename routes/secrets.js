const express = require('express')
const router = express.Router()
const {home, submit, secret, submitPost } = require('../controllers/secrets')

router.get('/', home )
router.route('/submit').get(submit).post(submitPost)
router.get('/secret', secret )

module.exports = router