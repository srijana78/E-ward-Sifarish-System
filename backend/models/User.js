const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Citizen uses phone
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // Citizen registration
    citizenshipNo: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // Government staff uses email
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // User role
    role: {
      type: String,
      enum: [
        "citizen",
        "frontoffice",
        "secretary",
        "chairperson",
        "admin",
      ],
      default: "citizen",
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Used only for staff (email-based) password resets — a short-lived
    // hashed token and its expiry, cleared once used or expired.
    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;