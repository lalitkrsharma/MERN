const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel");
// const roomAvailablity = require("../models/roomAvailablityModel");

// Get All bookings / Get a signle booking by Id
router.get("/", async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    bookingModel
      .find({ id: id })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "booking not found with id " + id });
        } else {
          res.send(data[0]);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving product with id " + id });
      });
  } else {
    bookingModel
      .find()
      .then((bookings) => {
        res.send(bookings);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retriving product information",
        });
      });
  }
});

// Save a booking to Database
router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //   let newBooking = req.body.booking;
  const booking = new bookingModel(
    {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      roomName: req.body.roomName,
      roomAddress: req.body.roomAddress,
      roomType: req.body.roomType,
      guest: req.body.guest,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      price: req.body.price,
      duration: req.body.duration,
    }
    // newBooking
  );

  // const bookingDates = getDuration(req.body.checkin, req.body.checkout)

  // const blockRoom = new roomAvailablity({
  //   hotelId: req.body.hotelId,
  //   bookingDates:
  // })

  booking
    .save(booking)
    .then((data) => {
      // roomAvailablity.save()
      res.status(201).send({ messgae: "New booking Added" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
});

// Update a booking by Id
router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  bookingModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update booking with ${id}. Maybe booking not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update booking information" });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  bookingModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "booking was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete booking with id=" + id,
      });
    });
});

module.exports = router;
