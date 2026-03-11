const { Schema, model } = require("mongoose");

const CarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price_per_Day: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = model("Car", CarSchema);
