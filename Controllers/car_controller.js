const express = require("express");
const Car = require("../Models/Car");
const { check_admin } = require("../Middleware/check_admin");
const { authMiddleware } = require("../Middleware/authMiddleware");
const upload = require("../Middleware/upload");
const redisClient = require("../Config/redis");

const AddCar = async (req, res) => {
  try {
    const { name, brand, price_per_day, availability } = req.body;
    const imageUrls = req.files.map((file) => file.path);
    const car = await Car.create({
      name,
      brand,
      price_per_day,
      availability,
      image: imageUrls,
    });
    await redisClient.del("cars");
    return res.status(201).json({
      message: "Car added Successfully.",
      car,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCar = async (req, res) => {
  try {
    const cachedCars = await redisClient.get("cars");

    if (cachedCars) {
      return res.status(200).json({
        source: "redis",
        message: "Car data fetched successfully.",
        cars: JSON.parse(cachedCars),
      });
    }

    const all_cars = await Car.find();

    if (all_cars.length === 0) {
      return res.status(404).json({
        message: "No Car is created yet.",
      });
    }

    await redisClient.set("cars", JSON.stringify(all_cars), { EX: 60 });

    return res.status(200).json({
      source: "database",
      message: "Car data fetched successfully.",
      cars: all_cars,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;

    const cache = await redisClient.get(`car:${carId}`);

    if (cache) {
      return res.status(200).json({
        source: "redis",
        message: "Car fetched successfully",
        car: JSON.parse(cache),
      });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    await redisClient.set(`car:${carId}`, JSON.stringify(car), { EX: 60 });

    return res.status(200).json({
      source: "database",
      message: "Car fetched successfully",
      car,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateCarDetails = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" },
    );
    await redisClient.del("cars");
    await redisClient.del(`car:${id}`);
    if (!updatedCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    return res.status(200).json({
      message: "Car details updated",
      updatedCar,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCarById = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    return res.status(200).json({
      message: "Car deleted successfully",
      deletedCar,
    });
    await redisClient.del("cars");
    await redisClient.del(`car:${id}`);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAllCars = async (req, res) => {
  try {
    const result = await Car.deleteMany({});

    return res.status(200).json({
      message: "All cars deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddCar,
  getAllCar,
  getCarById,
  updateCarDetails,
  deleteCarById,
  deleteAllCars,
};
