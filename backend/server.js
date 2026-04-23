const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//  MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

//  Schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

//  POST API
app.post("/contact", async (req, res) => {
  try {
    const newData = new Contact(req.body);
    await newData.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  GET API (bonus)
app.get("/messages", async (req, res) => {
  const data = await Contact.find();
  console.log("DATA RECEIVED:", req.body);
  res.json(data);
});

//  Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});