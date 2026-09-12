// import express from "express";

// import {
// getNotifications,
// markAsRead,
// markAllAsRead,
// } from "../controllers/notificationController.js";

// const router = express.Router();

// router.get("/", getNotifications);

// router.patch("/read-all", markAllAsRead);

// router.patch("/:id/read", markAsRead);

// export default router;

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/notificaionController");

router.get("/", auth, ctrl.getNotifications);
router.patch("/:id/read", auth, ctrl.markAsRead);
router.patch("/read-all", auth, ctrl.markAllAsRead);

module.exports = router;