const mongoose = require("mongoose");

const roomAvailablitySchema = mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
    bookingDates: [],
  },
  { timestamps: true }
);

const roomAvailablityModel = mongoose.model(
  "roomAvailablity",
  roomAvailablitySchema
);
module.exports = roomAvailablityModel;
