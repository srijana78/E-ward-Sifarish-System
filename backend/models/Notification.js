// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
// {
// title: {
// type: String,
// required: true,
// },


// message: {
//   type: String,
//   required: true,
// },

// type: {
//   type: String,
//   enum: ["application", "verified", "pending", "system"],
//   default: "system",
// },

// read: {
//   type: Boolean,
//   default: false,
// },

// application: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Application",
// },

// recipientRole: {
//   type: String,
//   enum: ["frontoffice", "secretary", "admin"],
//   default: "frontoffice",
// },


// },
// {
// timestamps: true,
// }
// );

// export default mongoose.model("Notification", notificationSchema);


const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["application", "verified", "recommended", "approved", "rejected", "pending", "system"],
      default: "system",
    },

    read: {
      type: Boolean,
      default: false,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },

    // For staff queue alerts, e.g. "a new application needs front office review"
    recipientRole: {
      type: String,
      enum: ["citizen", "frontoffice", "secretary", "chairperson", "admin"],
    },

    // For a targeted alert to one specific person, e.g. "your application was approved"
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);