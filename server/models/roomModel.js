const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    images: [],
    category: [],
    rating: { type: Number },
    reviews: [],
  },
  { timestamps: true }
);

const roomModel = mongoose.model("room", roomSchema);
module.exports = roomModel;
