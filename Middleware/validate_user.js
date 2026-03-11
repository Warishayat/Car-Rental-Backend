const joi = require('joi');


const Signup_validation = (req,res,next)=>{
    const schema = joi.object({
        name:joi.string().min(1).max(30).required(),
        email : joi.string().required().email(),
        password : joi.string().min(5).max(30).required()
    })
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400).json({
            success:false,
            message : error.message
        })
    }
    next();
}


const Login_Validation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().required().email(),
        password: joi.string().min(5).max(30).required()
    })
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            success:false,
            message:error
        })
    }
    next();
}


module.exports = {
    Signup_validation,
    Login_Validation
}