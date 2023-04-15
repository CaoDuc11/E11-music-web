// const siteRouter = require('./site')
const homeRouter = require('./home')
const authenticalRouter = require('./authentical')

function route(app) {
    // app.use('/', siteRouter)
    app.use('/authentical', authenticalRouter)
    app.use('/', homeRouter)
}

module.exports = route;