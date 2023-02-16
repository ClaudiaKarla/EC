const express = require('express')
const { previewController } = require('../controllers/sellers.controllers')
const isLoggedIn = require('../middleware/isLoggedIn')
const isSeller = require('../middleware/isSeller')
const router = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
})

module.exports = router
