const express = require('express')
const app = express()
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const databaseConnect = require('./database')

databaseConnect();

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())

app.use('/', require('./routes'))

app.listen(process.env.PORT || 3000, () => {
    console.log('app.js is running: http://localhost:3000')
})