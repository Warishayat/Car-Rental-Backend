const express = require('express');
const booking_router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware")
const {createBooking,cancelBooking,getMyBookings} = require("../Controllers/booking_controller")

/**
 * @swagger
 * /book/book-car:
 *   post:
 *     summary: Create a new car booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carId
 *               - startDate
 *               - endDate
 *             properties:
 *               carId:
 *                 type: string
 *                 example: 69b31c06e93c22d09d8a4f69
 *               startDate:
 *                 type: string
 *                 example: 2026-03-20
 *               endDate:
 *                 type: string
 *                 example: 2026-03-23
 *     responses:
 *       200:
 *         description: Booking created successfully
 */
booking_router.post("/book-car",authMiddleware,createBooking);
/**
 * @swagger
 * /book/my-booking/{id}:
 *   get:
 *     summary: Get user booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 69b474baeaac6d47fe2d7632
 *     responses:
 *       200:
 *         description: Booking fetched successfully
 */
booking_router.get("/my-booking/:id",authMiddleware,getMyBookings);
/**
 * @swagger
 * /book/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 69b474baeaac6d47fe2d7632
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */
booking_router.patch("/bookings/:id/cancel", authMiddleware, cancelBooking);

module.exports = booking_router;