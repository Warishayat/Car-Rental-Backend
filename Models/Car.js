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
    price_per_day: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    image:{
      type:[String],
      required:true
    },
  },
  { timestamps: true },
);

module.exports = model("Car", CarSchema);
