//definir el sistema de rutas

const { Router }=require("express")

const router =Router()


//lista de todos los productos

router.get("/",(req,res)=>{
    res.render("products/list")
})

module.exports=router