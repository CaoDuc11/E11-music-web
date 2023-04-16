// const siteRouter = require('./site')
const homeRouter = require('./home')
const authenticalRouter = require('./authentical')
const userRooter = require('./user')

function route(app) {
    // app.use('/', siteRouter)
    app.use('/user', userRooter)
    app.use('/authentical', authenticalRouter)
    app.use('/', homeRouter)
}

module.exports = route;