const User = require('../models/User');

class HomeController {
    index (req, res, next) {
        res.render('home')
    }
}

module.exports = new HomeController