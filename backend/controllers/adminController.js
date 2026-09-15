const bcrypt = require("bcryptjs");
const User = require("../models/User");

const allowedRoles = [
  "frontoffice",
  "secretary",
  "chairperson",
];

// ================= CREATE STAFF =================
const createStaff = async (req, res) => {
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
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: `${role} account created successfully`,
      user: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        isActive: staff.isActive,
      },
    });
  } catch (error) {
    console.error("Create staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create staff account",
    });
  }
};

// ================= GET ALL STAFF =================
const getAllStaff = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can access staff information",
      });
    }

    const staff = await User.find({
      role: {
        $in: allowedRoles,
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
};

// ================= GET SINGLE STAFF =================
const getStaffById = async (req, res) => {
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
        $in: allowedRoles,
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
};

// ================= UPDATE STAFF =================
const updateStaff = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update staff accounts",
      });
    }

    const { name, email, password, role } = req.body;

    const staff = await User.findOne({
      _id: req.params.id,
      role: {
        $in: allowedRoles,
      },
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff role",
      });
    }

    if (email && email.toLowerCase() !== staff.email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: staff._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered",
        });
      }

      staff.email = email.toLowerCase();
    }

    if (name) {
      staff.name = name;
    }

    if (role) {
      staff.role = role;
    }

    // Only change password if admin enters a new one
    if (password) {
      staff.password = await bcrypt.hash(password, 10);
    }

    await staff.save();

    res.status(200).json({
      success: true,
      message: "Staff account updated successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        isActive: staff.isActive,
      },
    });
  } catch (error) {
    console.error("Update staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update staff account",
    });
  }
};

// ================= DEACTIVATE STAFF =================
const deactivateStaff = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can deactivate staff accounts",
      });
    }

    const staff = await User.findOne({
      _id: req.params.id,
      role: {
        $in: allowedRoles,
      },
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    staff.isActive = false;

    await staff.save();

    res.status(200).json({
      success: true,
      message: "Staff account deactivated successfully",
    });
  } catch (error) {
    console.error("Deactivate staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate staff account",
    });
  }
};

// ================= ACTIVATE STAFF =================
const activateStaff = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can activate staff accounts",
      });
    }

    const staff = await User.findOne({
      _id: req.params.id,
      role: {
        $in: allowedRoles,
      },
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    staff.isActive = true;

    await staff.save();

    res.status(200).json({
      success: true,
      message: "Staff account activated successfully",
    });
  } catch (error) {
    console.error("Activate staff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to activate staff account",
    });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deactivateStaff,
  activateStaff,
};