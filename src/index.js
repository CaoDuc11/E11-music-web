const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')
const cookieParser = require("cookie-parser")
const port = 3005

const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 

app.use(methodOverride('_method'))
app.use(cookieParser());

app.use(session({
  secret: "amar",
  saveUninitialized: true,
  resave: true
}));

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'res', 'views'))

// Route init
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})