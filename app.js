// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// const moment =require("moment")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs')

//formato fecha
// hbs.registerHelper("formatoFecha", (date)=>{
//     return moment(date).format("DD/MM/YYYY  HH:mn:ss")
// })

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

const capitalize = require('./utils/capitalize')
const projectName = 'EC'

app.locals.appTitle = `${capitalize(projectName)} `

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const productsRoutes = require('./routes/products.routes')
app.use('/products', productsRoutes)

const sellerRoutes = require('./routes/seller.routes')
app.use('/seller', sellerRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
