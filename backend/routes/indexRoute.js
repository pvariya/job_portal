const express   = require('express');
const userRoute = require('./userRoute');

const indexRoute       = express.Router();

// Import the controller functions
indexRoute.use("/user",userRoute)

module.exports = indexRoute;