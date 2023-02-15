const express = require('express')
//Middleware solo de seller
const onlySeller=require("../middleware/sellerAccess")

const router = express.Router()

router.get("/dashboard",onlySeller,(req,res)=>{
    res.render("seller/dashboard")
})

router.get("/dashboard/products", onlySeller,(req, res)=>{
    res.render("seller/products")
})
   


module.exports=router;