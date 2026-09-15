const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ==========================================
// REGISTER CITIZEN
// ==========================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      phone,
      citizenshipNo,
      password,
    } = req.body;

    // Validate

    if (!name || !phone || !citizenshipNo || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check phone

    const existingPhone = await User.findOne({
      phone,
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already registered",
      });
    }

    // Check citizenship number

    const existingCitizenship = await User.findOne({
      citizenshipNo,
    });

    if (existingCitizenship) {
      return res.status(400).json({
        success: false,
        message: "Citizenship number is already registered",
      });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create citizen

    const user = await User.create({
      name,
      phone,
      citizenshipNo,
      password: hashedPassword,
      role: "citizen",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Please login.",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        citizenshipNo: user.citizenshipNo,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
  try {
    const {
      identifier,
      password,
      loginType,
    } = req.body;

    // Validate

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Identifier and password are required",
      });
    }

    let user;

    // ==========================================
    // CITIZEN LOGIN USING PHONE
    // ==========================================

    if (loginType === "citizen") {
      user = await User.findOne({
        phone: identifier,
        role: "citizen",
      });
    }

    // ==========================================
    // STAFF LOGIN USING EMAIL
    // ==========================================

    else if (loginType === "staff") {
      user = await User.findOne({
        email: identifier.toLowerCase(),
        role: {
          $in: [
            "frontoffice",
            "secretary",
            "chairperson",
            "admin",
          ],
        },
      });
    }

    // Invalid login type

    else {
      return res.status(400).json({
        success: false,
        message: "Invalid login type",
      });
    }

    // User not found

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ==========================================
    // CHECK ACCOUNT STATUS
    // ==========================================

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact the administrator.",
      });
    }

    // Compare password

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};