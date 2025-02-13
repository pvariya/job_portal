const express = require("express");
const userRoute = require("./userRoute");
const taskRoute = require("./taskRoute");

const indexRoute = express.Router();
indexRoute.use("/user", userRoute);
indexRoute.use('/task',taskRoute)
module.exports = indexRoute;
