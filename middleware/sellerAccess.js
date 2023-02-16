 module.exports=(req,res,next)=>{
    //el role viene en req.session.role
    if(req.session.currentUser.role==="seller"){
        next()
        return
    }
    return res.redirect("/products")
  
 }