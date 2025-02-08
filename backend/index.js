const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const indexRoute = require("./routes/indexRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", indexRoute);

app.listen(8090, () => {
  console.log("Server is running on port 8090");

  db();
});
