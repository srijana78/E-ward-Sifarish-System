
const mongoose = require("mongoose");

const systemSettingsSchema = new mongoose.Schema(
  {
    municipality: {
      type: String,
      required: true,
    },

    ward: {
      type: String,
      required: true,
    },

    address: String,
    phone: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SystemSettings",
  systemSettingsSchema
);
