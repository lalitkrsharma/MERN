const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const encryption = require("../utils/encryption");

router.post("/signup", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // console.log(req.body.email);
  userModel
    .find({ email: req.body.email })
    .then((isUserExist) => {
      // res.status(205).send(isUserExist);
      if (isUserExist.length > 0) {
        res.status(200).send({ message: "This email is already registered" });
        return;
      } else {
        const encryptedPassword = encryption.encrypt(req.body.password);
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: encryptedPassword,
          isAdmin: req.body.isAdmin,
        });
        user
          .save(user)
          .then((data) => {
            //res.send(data)
            res.status(201).send({
              success: "New User Added",
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              isAdmin: req.body.isAdmin
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Registration failed!",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error" });
      return;
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email: email });
    if (
      user.length > 0 /*&& password === encryption.decrypt(user[0].password)*/
    ) {
      let decryptedPassword = encryption.decrypt(user[0].password);
      console.log(decryptedPassword);
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        phone: user[0].phone,
        isAdmin: user[0].isAdmin,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Incorrect Email or Password",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message || "Something Went wrong",
    });
  }
});


// router.get("/getallusers", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(404).json({ message: error.stack });
//   }
// });

// router.post("/deleteuser", async (req, res) => {
//   const userid = req.body.userid;
//   try {
//     await User.findOneAndDelete({ _id: userid });
//     res.status(200).send("User Deleted");
//   } catch (error) {
//     res.status(404).json({ message: error.stack });
//   }
// });
module.exports = router;
