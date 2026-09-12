// import Notification from "../models/Notification.js";

// // GET all notifications
// export const getNotifications = async (req, res) => {
// try {
// const notifications = await Notification.find()
// .populate("application", "applicationNumber service")
// .sort({ createdAt: -1 });


// res.status(200).json({ notifications });


// } catch (error) {
// res.status(500).json({
// message: "Failed to fetch notifications",
// error: error.message,
// });
// }
// };

// // MARK one notification as read
// export const markAsRead = async (req, res) => {
// try {
// const notification = await Notification.findByIdAndUpdate(
// req.params.id,
// { read: true },
// { new: true }
// );


// if (!notification) {
//   return res.status(404).json({
//     message: "Notification not found",
//   });
// }

// res.status(200).json({
//   message: "Notification marked as read",
//   notification,
// });


// } catch (error) {
// res.status(500).json({
// message: "Failed to update notification",
// error: error.message,
// });
// }
// };

// // MARK all notifications as read
// export const markAllAsRead = async (req, res) => {
// try {
// await Notification.updateMany(
// { read: false },
// { read: true }
// );


// res.status(200).json({
//   message: "All notifications marked as read",
// });


// } catch (error) {
// res.status(500).json({
// message: "Failed to update notifications",
// error: error.message,
// });
// }
// };

const Notification = require("../models/Notification");

// ================= INTERNAL HELPER =================
// Not a route — called directly from applicationController whenever a
// workflow stage changes. Pass recipientRole for a staff queue alert,
// recipientUser for a targeted alert to one specific person, or both.
const createNotification = async ({
  title,
  message,
  type = "system",
  application,
  recipientRole,
  recipientUser,
}) => {
  return Notification.create({ title, message, type, application, recipientRole, recipientUser });
};

// ================= GET NOTIFICATIONS =================
// GET /api/notifications
// Citizens only see notifications addressed to them; staff see their role's
// queue alerts; admin sees everything.
const getNotifications = async (req, res) => {
  try {
    let filter;
    if (req.user.role === "admin") {
      filter = {};
    } else if (req.user.role === "citizen") {
      filter = { recipientUser: req.user.id };
    } else {
      filter = { recipientRole: req.user.role };
    }

    const notifications = await Notification.find(filter)
      .populate("application", "applicationNumber service")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// ================= MARK ONE AS READ =================
// PATCH /api/notifications/:id/read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// ================= MARK ALL AS READ =================
// PATCH /api/notifications/read-all
// Scoped to the requesting user — do NOT mark every user's notifications
// as read, only theirs.
const markAllAsRead = async (req, res) => {
  try {
    let filter;
    if (req.user.role === "admin") {
      filter = { read: false };
    } else if (req.user.role === "citizen") {
      filter = { recipientUser: req.user.id, read: false };
    } else {
      filter = { recipientRole: req.user.role, read: false };
    }

    await Notification.updateMany(filter, { read: true });
    res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
      error: error.message,
    });
  }
};

module.exports = { createNotification, getNotifications, markAsRead, markAllAsRead };