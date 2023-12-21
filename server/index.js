
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // req.body

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});



