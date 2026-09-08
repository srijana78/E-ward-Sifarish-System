const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ================= REGISTER CITIZEN =================

router.post("/register", async (req, res) => {
  try {
    const { name, phone, citizenshipNo, password } = req.body;

    // Check required fields
    if (!name || !phone || !citizenshipNo || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check phone
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    // Check citizenship number
    const existingCitizenship = await User.findOne({
      citizenshipNo,
    });

    if (existingCitizenship) {
      return res.status(400).json({
        message: "Citizenship number already registered",
      });
    }

    // Create citizen
    const newUser = await User.create({
      name,
      phone,
      citizenshipNo,
      password,
      role: "citizen",
    });

    res.status(201).json({
      message: "Registration successful",

      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        citizenshipNo: newUser.citizenshipNo,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});


// ================= LOGIN USER =================

router.post("/login", async (req, res) => {
  try {
    const { identifier, password, loginType } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Login information is required",
      });
    }

    let user;

    // Citizen login using phone
    if (loginType === "citizen") {
      user = await User.findOne({
        phone: identifier,
        role: "citizen",
      });
    }

    // Front Office/Admin login using email
    else {
      user = await User.findOne({
        email: identifier,
        role: { $in: ["frontoffice", "admin"] },
      });
    }

    // User not found
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Password check
    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;