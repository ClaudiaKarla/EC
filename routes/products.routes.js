//definir el sistema de rutas
const Producto=require("../models/Producto.model")
const { Router }=require("express")

const router =Router()


//lista de todos los productos

router.get("/",(req,res)=>{
    Producto.find()
    .then(productos=>{
        res.render("products/list",{userInSession:req.session.currentUser, productos})
    }) .catch(err=>{
        next(err)
      })
})

module.exports=router