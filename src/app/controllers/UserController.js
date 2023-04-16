const User = require('../models/User');
const Artist = require('../models/Artist');
const Song = require('../models/Song');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToobject } = require('../../util/mongoose')

class UserController {

    recentPlayed (req, res, next) {
        let recentPlays = req.session.user.recent_play.sort((a, b) => {
            return new Date(b.time_play) - new Date(a.time_play)
        })

        const promises = recentPlays.map(play => Song.findOne({ name: play.song_name }));
            Promise.all(promises)
                .then(songs => {
                    res.render('user/recentPlay', {
                        songs: multipleMongooseToObject(songs)
                    })
                })
                .catch(next);
    }

    addRecentPlay(req, res, next) {
        User.findOne({ username: req.session.user.username })
            .then(user => {
                const songName = req.params.song_name
                
                var recentPlays = user.recent_play.sort((a, b) => {
                    return new Date(a.time_play) - new Date(b.time_play)
                })
                
                // Tìm phần tử trùng tên nhạc
                recentPlays = recentPlays.filter(function(play) {
                    return play.song_name.toString() !== songName
                })
                  
                // Nếu mảng vượt quá giới hạn hoặc full thì xóa phần tử đầu ( bài hát được nghe từ lâu nhất )
                if (recentPlays.length >= 10) {
                    recentPlays.shift()
                }
                
                // Push bài hát mới vào trong mảng
                recentPlays.push({
                    song_name: songName,
                    time_play: new Date()
                })

                user.recent_play = recentPlays
                user.save()

                req.session.user = mongooseToobject(user)
                req.session.save()
                res.redirect('/')
            })
            .catch(next)
    }   

}

module.exports = new UserController