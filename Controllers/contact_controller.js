const Contact = require('../Models/Contact')
const mongoose = require('mongoose');

const ContactUs = async (req, res) => {
  try {
    const { name, email,topic,message } = req.body;

    if (!name || !email || !message || !topic) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const request = new Contact({ name, email,topic,message });
    await request.save();

    return res.status(201).json({
      success: true,
      message: "Request has been made successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { ContactUs };