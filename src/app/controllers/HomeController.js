const User = require('../models/User')
const Artist = require('../models/Artist')
const Song = require('../models/Song')
const { multipleMongooseToObject } = require('../../util/mongoose')

class HomeController {
    index (req, res, next) {
        Promise.all([Artist.find({}), Song.find({})])
            .then(([artists, songs]) => {
                res.render('home', {
                    artists: multipleMongooseToObject(artists),
                    songs: multipleMongooseToObject(songs),
                    user: req.session.user,
                })
            })
            .catch(next)    
    }
}

module.exports = new HomeController