const express = require('express')
const router = express.Router()

//dirigir a login 
router.get('/signup', isLoggedOut, (req, res, next)=>{
    res.render('auth/login')
  })

  module.exports = router
