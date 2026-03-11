const CheckRole = (req,res,next)=>{
    if (req.user.role!=="admin"){
        res.status(403).json({
            success:false,
            message:"Acess deneid. Only admin can acess"
        })
    }
    next();
}

module.exports = CheckRole;