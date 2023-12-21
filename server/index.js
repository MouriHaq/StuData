
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


// Get all links
app.get("/links", async (req, res) => {
  try {
    const allLinks = await pool.query("SELECT * FROM links");
    res.json(allLinks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get a link
app.get("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const link = await pool.query("SELECT * FROM links WHERE id = $1", [id]);

    res.json(link.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


// Update a link
app.put("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, email, contact_number, city_name } = req.body;
    const updateLink = await pool.query(
      "UPDATE links SET name = $1, url = $2, email = $3, contact_number = $4, city_name = $5 WHERE link_id = $6",
      [name, url, email, contact_number, city_name, id]
    );

    res.json({ message: "Link was updated!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


// Delete a link
app.delete("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLink = await pool.query("DELETE FROM links WHERE id = $1", [id]);
    res.json({ message: "Link was deleted!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});



app.post("/api/addLink", async (req, res) => {
  try {
    const { name, URL } = req.body;
    // Insert the data into your database here using your database connection (e.g., pool.query)
    // ...
    res.json({ success: true, message: "Link added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});