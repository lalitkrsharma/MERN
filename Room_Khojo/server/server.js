const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/room", require("./routes/roomRoute"));
app.use("/api/booking", require("./routes/bookingRoute"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/orders", require("./routes/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server via Nodemon</h1>");
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on http://localhost:${process.env.PORT}`
      .blue
  );
});

