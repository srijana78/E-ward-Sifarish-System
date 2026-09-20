// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const authRoutes = require("./routes/authRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const settingsRoutes = require("./routes/settingsRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

// const app = express();

// const PORT = process.env.PORT || 5000;

// // ================= MIDDLEWARE =================

// app.use(cors());


// app.use(express.json());

// // ================= ROUTES =================

// app.use("/api/auth", authRoutes);

// app.use("/api/applications", applicationRoutes);

// app.use("/api/admin", adminRoutes);

// app.use("/api/settings", settingsRoutes);

// app.use("/api/notifications", notificationRoutes);

// // ================= STATIC FILES =================

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ================= TEST ROUTE =================

// app.get("/", (req, res) => {
//   res.send("MERN Backend is running!");
// });

// // ================= MONGODB CONNECTION =================

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("MongoDB connection error:", error.message);
//   });


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Render (and most hosts) sit behind a reverse proxy — this makes
// req.ip reflect the real client IP instead of the proxy's IP.
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/notifications", notificationRoutes);

// ================= STATIC FILES =================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("MERN Backend is running!");
});

// ================= 404 HANDLER =================
// Catches any request that didn't match a route above

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================= GLOBAL ERROR HANDLER =================
// Catches errors passed via next(err), and prevents unhandled errors
// from crashing the whole process. Must stay last, and must keep
// all four arguments (err, req, res, next) for Express to treat it
// as an error handler.

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
});

// ================= MONGODB CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });