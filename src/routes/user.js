const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

router.get('/recent_played', userController.recentPlayed)
router.get('/:song_name/add_recent_play', userController.addRecentPlay)

module.exports = router