const express = require("express");

const userRoute = express.Router();

const { signUp } = require("../controller/userController");
userRoute.post("/signup", signUp);

module.exports = userRoute;
