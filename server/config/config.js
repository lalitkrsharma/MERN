const mongoose = require("mongoose");
const express = require("express");
require("colors");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongodb DataBase Connected! ${conn.connection.host}`.green);
  } catch (error) {
    console.log(`error: ${error.message}`.red);
  }
};

module.exports = connectDB;
