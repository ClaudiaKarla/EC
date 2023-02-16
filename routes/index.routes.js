const express = require('express')
const { previewController } = require('../controllers/sellers.controllers')
const isLoggedIn = require('../middleware/isLoggedIn')
const isSeller = require('../middleware/isSeller')
const router = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
})

//router.get('/preview', isLoggedIn, isSeller, previewController)

//profile usuario si es que hay
//router.get("/profile",(req,res,next)=>{
//res.render("profile", req.session.currentUser)
//})

//router.post('/profile/:id',(req,res,next)=>{
//  const {id}= req.params
//})

module.exports = router
