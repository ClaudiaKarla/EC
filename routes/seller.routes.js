const express = require('express')
//Middleware solo de seller
const onlySeller=require("../middleware/sellerAccess")
//este
const Producto=require("../models/Producto.model")
const router = express.Router()

router.get("/dashboard",onlySeller,(req,res)=>{
    res.render("seller/dashboard",{userInSession:req.session.currentUser})
})

router.get("/dashboard/products", onlySeller,(req, res)=>{
 //este
    Producto.find()
    .then(productos=>{
        res.render("seller/products",{userInSession:req.session.currentUser, productos})
    }) .catch(err=>{
        next(err)
      })
    
})
//
router.get("/dashboard/products/nuevo", onlySeller,(req, res)=>{
    res.render("seller/newProduct",{userInSession:req.session.currentUser})
})

router.get("/dashboard/products/edit/:id", onlySeller,async (req, res)=>{
    try{
    const {id}=req.params
    const datos=await Producto.findById(id)
    res.render("seller/editProduct",{userInSession:req.session.currentUser, datos})
}catch(err){
next(err)
}
})
   
router.post("/dashboard/products/nuevo", onlySeller,(req, res, next)=>{
    console.log(req.body)

    //Creamos nuestro nuevo producto
   
   //este
    Producto.create(req.body)
    .then((nuevoProducto)=>{
        res.redirect("/seller/dashboard/products")
    })
  .catch(err=>{
    next(err)
  })
})

//editamos producto
router.post("/dashboard/products/edit/:id", onlySeller,(req, res,next)=>{
 const {id}=req.params
 //este Producto
 Producto.findByIdAndUpdate(id,req.body,{new:true})
 .then((productoActualizado)=>{
    console.log(productoActualizado)
    res.redirect(`/seller/dashboard/products`)
 }).catch(err=>next(err))
})

router.post("/dashboard/products/delete/:id", onlySeller,(req,res,next)=>{
    const {id} = req.params
    console.log("Eliminando", id)

    //este
    Producto.findByIdAndDelete(id)
    .then(()=>{
        //redireccionar a la vista de productos
        //res.redirect("/seller/dashboard/products")
        res.json(JSON.stringify({eliminado:true}))
    })
    .catch(err=>{
        next(err)
    })
})

module.exports=router;