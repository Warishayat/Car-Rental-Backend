const express = require('express');
const car_router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware')
const check_admin = require("../Middleware/check_admin")
const upload = require("../Middleware/upload")
const {AddCar,getAllCar,getCarById,updateCarDetails,deleteCarById,deleteAllCars} = require('../Controllers/car_controller')



car_router.post("/add-car",authMiddleware,check_admin,upload.array("images",3),AddCar)
car_router.get("/get-all-cars",getAllCar)
car_router.get("/get-all-cars/:id",getCarById)
car_router.put("/update-car/:id",authMiddleware,check_admin,updateCarDetails)
car_router.delete("/delete-car/:id",authMiddleware,check_admin,deleteCarById)
car_router.delete("/delete-all",authMiddleware,check_admin,deleteAllCars)

module.exports = car_router;
