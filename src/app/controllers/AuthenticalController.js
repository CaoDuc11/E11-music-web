const { error } = require('console')
const { mongooseToobject } = require('../../util/mongoose')
const User = require('../models/User')

// Check if user is empty
function isEmpty (obj) {
    return Object.keys(obj).length === 0    
}

class AuthenticalController {
    // Signup Site
    signup(req, res, next) {
        res.render('signup', { layout: 'authentication' })
    }

    // Login Site
    login(req, res, next) {
        res.render('login', { layout: 'authentication' })
    }

    logout(req, res, next) {
        req.session.destroy()
        res.redirect('/')
    }

    // Check Login
    checkLogin(req, res, next) {
        User.findOne(req.body)
            .then(user => {
                if (user) {
                    req.session.user = mongooseToobject(user)
                    req.session.save()              
                    res.redirect('/')
                }
                else {
                    res.render('login', { 
                        layout: 'authentication',
                        message: 'Account doesnt exist! Please sign up!'
                    })
                }
            })
            .catch(next)
    }

    // Check Signup
    checkSignup(req, res, next) {
        User.findOne(req.body)
            .then(user => {
                if (!user) {
                    req.body.avatar = '/img/default.jpg'
                    req.body.recent_play = []
                    const user = new User(req.body)
                    user.save()
                        .then(() => res.redirect('/authentical/login'))
                        .catch(err => {})
                }
                else {
                    res.render('signup', { 
                        layout: 'authentication',
                        message: 'Account already exists'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = new AuthenticalController