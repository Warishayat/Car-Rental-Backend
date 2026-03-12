const express = require('express');
const auth_router = express.Router();

const {Signup_Controller,Login_Controller} = require('../Controllers/auth_controller');
const {Signup_validation,Login_Validation} = require("../Middleware/validate_user");

auth_router.post('/signup',Signup_validation,Signup_Controller);
auth_router.post('/login',Login_Validation,Login_Controller);

module.exports = auth_router;

