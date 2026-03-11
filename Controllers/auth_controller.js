const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Users = require('../Models/Users');


const Signup_Controller = async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const exist_user = await Users.findOne({email});
        if(exist_user){
            return res.status(404).json({
                success:false,
                message:"User already exist, you can login now."
            })
        }
        const hash_pass = await bcrypt.hash(password,10);
        const new_user = new Users({name,email,password:hash_pass});
        await new_user.save();
        res.status(201).json({
            success:true,
            message:'User created Successfully.'
        })
    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internel Server Error try again later."
        })
    }
}


const Login_Controller = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const exist_user = await Users.findOne({email});
        if (!exist_user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const pass_check = await bcrypt.compare(password,exist_user.password)
        if (!pass_check){
            res.status(400).json({
                success:false,
                message:"User enter wrong email or password"
            })
        }

        const token = jsonwebtoken.sign(
            {id:exist_user.id,role:exist_user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({
            token,
            user:{
                id:exist_user.id,
                name:exist_user.name
            }
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:'Internel Server error, try again later.'
        })
    }
}


module.exports = {Signup_Controller,Login_Controller}