const express = require('express');
const contact_router = express.Router();
const {ContactUs,getallContact} = require("../Controllers/contact_controller")
const authMiddleware = require('../Middleware/authMiddleware')
const check_admin = require('../Middleware/check_admin')

contact_router.post("/contact-us",ContactUs);
contact_router.get("/all-messages",authMiddleware,check_admin,getallContact)

module.exports = contact_router;