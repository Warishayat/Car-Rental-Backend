const express = require('express');
const auth_router = express.Router();

const {Signup_Controller,Login_Controller} = require('../Controllers/auth_controller');
const {Signup_validation,Login_Validation} = require("../Middleware/validate_user");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Waris
 *               email:
 *                 type: string
 *                 example: waris@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User registered
 */
auth_router.post('/signup',Signup_validation,Signup_Controller);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: waris@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
auth_router.post('/login',Login_Validation,Login_Controller);

module.exports = auth_router;