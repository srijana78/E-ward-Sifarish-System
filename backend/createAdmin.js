const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const password = await bcrypt.hash("admin1234", 10);

    await User.create({
      name: "System Admin",
      email,
      password,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin1234");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();