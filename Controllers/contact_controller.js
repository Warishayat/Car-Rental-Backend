const Contact = require('../Models/Contact');
const Booking = require("../Models/Booking");
const mongoose = require('mongoose');
const Car = require("../Models/Car")
const generateInvoice = require("../utils/generateInvoice");
const sendEmail = require("../utils/sendEmail");
const User = require("../Models/Users");
const fs = require("fs");

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


const getallContact = async(req,res)=>{
  try {
    const all_messages = await Contact.find()
  if (all_messages.legth===0){
    return res.status(404).json({
        message:"No message received till now"
    })
  }
  return res.status(200).json({
    message:"All messages fetched successfully",
    all_messages
  })
  } catch (error) {
    return res.status(500).json({
      message:error
    })
  }
}

const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "name brand price_per_Day")

    res.json({
      count: bookings.length,
      bookings
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const cancelAnyBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" })
    }

    booking.status = "cancelled"

    await booking.save()

    const car = await Car.findById(booking.car)
    const user = await User.findById(booking.user)

    const filePath = await generateInvoice(booking, car)

    await sendEmail(
      user.email,
      "Booking Cancelled by Admin",
      "Your car booking has been cancelled by admin. Please check attached receipt.",
      filePath
    )

    fs.unlinkSync(filePath);

    res.json({
      message: "Booking cancelled by admin",
      booking
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { ContactUs,getallContact,getAllBookings,cancelAnyBooking };