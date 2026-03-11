const express = require('express');
const contact_router = express.Router();
const {ContactUs} = require("../Controllers/contact_controller")


contact_router.post("/contact-us",ContactUs);

module.exports = contact_router;