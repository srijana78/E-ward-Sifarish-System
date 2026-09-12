const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@eward.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "System Admin",
      email,
      password,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@eward.com");
    console.log("Password: admin123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();