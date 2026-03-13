const express = require('express');
const contact_router = express.Router();
const {ContactUs,getallContact,getAllBookings,cancelAnyBooking} = require("../Controllers/contact_controller")
const authMiddleware = require('../Middleware/authMiddleware')
const check_admin = require('../Middleware/check_admin')

/**
 * @swagger
 * /admin/contact-us:
 *   post:
 *     summary: Send contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - topic
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Waris
 *               email:
 *                 type: string
 *                 example: waris@gmail.com
 *               topic:
 *                 type: string
 *                 example: Booking Issue
 *               message:
 *                 type: string
 *                 example: I want to know about car availability
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
contact_router.post("/contact-us",ContactUs);
/**
 * @swagger
 * /admin/all-messages:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all contact messages
 */
contact_router.get("/all-messages",authMiddleware,check_admin,getallContact);
/**
 * @swagger
 * /admin/bookings/all:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Admin Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 */
contact_router.get("/bookings/all", authMiddleware, check_admin, getAllBookings);
/**
 * @swagger
 * /admin/bookings/admin-cancel/{id}:
 *   patch:
 *     summary: Admin cancel any booking
 *     tags: [Admin Bookings]
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
 *         description: Booking cancelled by admin
 */
contact_router.patch("/bookings/admin-cancel/:id", authMiddleware, check_admin, cancelAnyBooking)

module.exports = contact_router;