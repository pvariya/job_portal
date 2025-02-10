const mongoose = require("mongoose");
const db = async () => {
  await mongoose.connect("mongodb://localhost:27017/job_portal");
  console.log("Connected to MongoDB");
};

module.exports = db;
