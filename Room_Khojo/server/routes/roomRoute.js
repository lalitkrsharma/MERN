const express = require("express");
const router = express.Router();
const roomModel = require("../models/roomModel");

// Get All Rooms / Get a signle Room by Id
router.get("/", async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    roomModel
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Room not found with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving product with id " + id });
      });
  } else {
    let location = req.query.location;
    roomModel
      .find({ address: new RegExp(location, "i") })
      .then((rooms) => {
        res.send(rooms);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retriving product information",
        });
      });
  }
});
// Get Trendings
router.get("/trendings", async (req, res) => {

  roomModel
    .find().limit(3)
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occured while retriving product information",
      });
    });
});

// Save a Room to Database
router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const room = new roomModel({
    name: req.body.name,
    address: req.body.address,
    images: req.body.images,
    category: req.body.category,
    rating: req.body.rating,
    reviews: req.body.reviews,
  });

  room
    .save(room)
    .then((data) => {
      //res.send(data)
      res.status(201).send("New Room Added");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
});

// Update a Room by Id
router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  roomModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update room with ${id}. Maybe room not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update room information" });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  roomModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Room was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Room with id=" + id,
      });
    });
});

module.exports = router;
