const check_admin =(req,res,next)=>{
    if (req.user.role !=='admin'){
        return res.status(403).json({
            message:"Acess denied, Only Admin can create,update,delete the post"
        })
    }
    next()
}

module.exports = check_admin;