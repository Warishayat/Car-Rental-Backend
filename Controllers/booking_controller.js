const Booking = require("../Models/Booking")
const Car = require("../Models/Car")
const generateInvoice = require("../utils/generateInvoice")
const sendEmail = require("../utils/sendEmail")
const User = require("../Models/Users")
const fs = require("fs")

const createBooking = async (req, res) => {
  try {

    const { carId, startDate, endDate } = req.body

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        message: "carId, startDate and endDate are required"
      })
    }

    const car = await Car.findById(carId)

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      })
    }

    const conflict = await Booking.findOne({
      car: carId,
      status: "booked",
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    })

    if (conflict) {
      return res.status(400).json({
        message: "Car already booked for selected dates"
      })
    }

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24)
    )

    if (days <= 0) {
      return res.status(400).json({
        message: "Invalid booking dates"
      })
    }

    const totalPrice = days * car.price_per_day

    const booking = await Booking.create({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      totalPrice
    })

    const user = await User.findById(req.user.id)

    const filePath = await generateInvoice(booking, car)

    await sendEmail(
      user.email,
      "Car Booking Confirmation",
      "Your booking is confirmed. Receipt attached.",
      filePath
    )

    fs.unlinkSync(filePath)


    res.status(201).json({
      message: "Booking created successfully",
      booking
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    console.log("Booking user:", booking.user.toString())
    console.log("Token user:", req.user.id)
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" })
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" })
    }

    booking.status = "cancelled"

    await booking.save()

    const car = await Car.findById(booking.car)
    const user = await User.findById(req.user.id)

    const filePath = await generateInvoice(booking, car)

    await sendEmail(
      user.email,
      "Booking Cancelled",
      "Your booking has been cancelled. Receipt attached.",
      filePath
    )

    fs.unlinkSync(filePath)

    res.json({
      message: "Booking cancelled successfully",
      booking
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
      status: { $ne: "cancelled" }
    })
    .populate("car")

    res.json({
      count: bookings.length,
      bookings
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createBooking,cancelBooking,getMyBookings }