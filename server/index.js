
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

// Create a link
app.post("/links", async (req, res) => {
  try {
    const { name, url, email, contact_number, city_name } = req.body;
    const newLink = await pool.query(
      "INSERT INTO links (name, url, email, contact_number, city_name) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, url, email, contact_number, city_name]
    );

    res.json(newLink.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
