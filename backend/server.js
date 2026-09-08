require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);


// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });


// Test Route

app.get("/", (req, res) => {
  res.send("MERN Backend is running!");
});


// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});