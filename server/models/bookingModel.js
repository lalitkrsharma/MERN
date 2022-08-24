const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    roomName: { type: String, required: true },
    roomAddress: { type: String, required: true },
    roomType: { type: String, required: true },
    guest: { type: Number, required: true },
    checkin: { type: String, required: true },
    checkout: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
