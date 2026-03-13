const express = require('express');
const car_router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware')
const check_admin = require("../Middleware/check_admin")
const upload = require("../Middleware/upload")
const {AddCar,getAllCar,getCarById,updateCarDetails,deleteCarById,deleteAllCars} = require('../Controllers/car_controller')


/**
 * @swagger
 * /car/add-car:
 *   post:
 *     summary: Add a new car (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Honda Civic
 *               brand:
 *                 type: string
 *                 example: Honda
 *               pricePerDay:
 *                 type: number
 *                 example: 3000
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Car added successfully
 */
car_router.post("/add-car",authMiddleware,check_admin,upload.array("images",3),AddCar)
/**
 * @swagger
 * /car/get-all-cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of all cars
 */
car_router.get("/get-all-cars",getAllCar)
/**
 * @swagger
 * /car/get-all-cars/{id}:
 *   get:
 *     summary: Get car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 69b31c06e93c22d09d8a4f69
 *     responses:
 *       200:
 *         description: Car fetched successfully
 */
car_router.get("/get-all-cars/:id",getCarById)
/**
 * @swagger
 * /car/update-car/{id}:
 *   put:
 *     summary: Update car details (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 69b31c06e93c22d09d8a4f69
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Toyota Corolla
 *               brand:
 *                 type: string
 *                 example: Toyota
 *               pricePerDay:
 *                 type: number
 *                 example: 3500
 *     responses:
 *       200:
 *         description: Car updated successfully
 */
car_router.put("/update-car/:id",authMiddleware,check_admin,updateCarDetails)
/**
 * @swagger
 * /car/delete-car/{id}:
 *   delete:
 *     summary: Delete a car (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 69b31c06e93c22d09d8a4f69
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */
car_router.delete("/delete-car/:id",authMiddleware,check_admin,deleteCarById)
/**
 * @swagger
 * /car/delete-all:
 *   delete:
 *     summary: Delete all cars (Admin only)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All cars deleted successfully
 */
car_router.delete("/delete-all",authMiddleware,check_admin,deleteAllCars)

module.exports = car_router;
