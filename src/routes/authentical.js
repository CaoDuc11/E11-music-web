const express = require('express')
const router = express.Router()

const authenticalController = require('../app/controllers/AuthenticalController')

router.get('/signup', authenticalController.signup)
router.post('/signup/checkSignup', authenticalController.checkSignup)
router.get('/login', authenticalController.login)
router.post('/login/checkLogin', authenticalController.checkLogin)
router.get('/logout', authenticalController.logout)


module.exports = router