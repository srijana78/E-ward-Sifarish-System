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

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
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
    });
  }
};

// ==========================================
// FORGOT PASSWORD — STAFF (email-based link)
// ==========================================
// Staff log in with email, so a reset link is sent there.
// Always returns a generic success message, whether or not the email
// matches an account — this avoids leaking which emails are registered.

const forgotPasswordStaff = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const genericResponse = {
      success: true,
      message:
        "If that email is registered, a password reset link has been sent.",
    };

    const user = await User.findOne({
      email: email.toLowerCase(),
      role: { $in: ["frontoffice", "secretary", "chairperson", "admin"] },
    });

    // Don't reveal whether the account exists — respond the same either way
    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",")[0].trim()
      : "http://localhost:5173";

    const resetLink = `${frontendUrl}/reset-password/${rawToken}`;

    try {
      await sendPasswordResetEmail(user.email, resetLink);
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);
      // Don't leak email-sending failures to the client either —
      // log it server-side so it can be investigated, but the response
      // stays generic.
    }

    res.status(200).json(genericResponse);
  } catch (error) {
    console.error("Forgot password (staff) error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// RESET PASSWORD — STAFF (completes the email link)
// ==========================================

const resetPasswordStaff = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This reset link is invalid or has expired",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password (staff) error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// FORGOT PASSWORD — CITIZEN (identity-verified reset)
// ==========================================
// Citizens don't reliably have an email on file, so there's no link to
// email them. Instead, they confirm two pieces of identity they provided
// at registration — phone number and citizenship number — and set a new
// password directly. Rate-limited at the route level against brute-force
// guessing of the citizenship number.

const forgotPasswordCitizen = async (req, res) => {
  try {
    const { phone, citizenshipNo, newPassword } = req.body;

    if (!phone || !citizenshipNo || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Phone, citizenship number and new password are all required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({
      phone,
      citizenshipNo,
      role: "citizen",
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "We couldn't verify your identity with that phone number and citizenship number",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Forgot password (citizen) error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPasswordStaff,
  resetPasswordStaff,
  forgotPasswordCitizen,
};