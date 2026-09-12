const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= CREATE STAFF =================
router.post("/create-staff", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create staff accounts",
      });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const allowedRoles = [
      "frontoffice",
      "secretary",
      "chairperson",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff role",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: `${role} account created successfully`,
      user: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    console.error("Create staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create staff account",
    });
  }
});

// ================= GET ALL STAFF =================
router.get("/staff", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can access staff information",
      });
    }

    const staff = await User.find({
      role: {
        $in: ["frontoffice", "secretary", "chairperson"],
      },
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get staff",
    });
  }
});

// ================= GET SINGLE STAFF =================
router.get("/staff/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can access staff information",
      });
    }

    const staff = await User.findOne({
      _id: req.params.id,
      role: {
        $in: ["frontoffice", "secretary", "chairperson"],
      },
    }).select("-password");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    console.error("Get staff details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get staff details",
    });
  }
});

module.exports = router;