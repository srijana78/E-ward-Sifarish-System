
const SystemSettings = require("../models/SystemSettings");

// GET SETTINGS
const getSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();

    if (!settings) {
      settings = await SystemSettings.create({
        municipality: "Nepalgunj Sub-Metropolitan City",
        ward: "Ward No. 1",
        address: "Nepalgunj, Banke, Nepal",
        phone: "081-000000",
        email: "info@nepalgunj.gov.np",
      });
    }

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get settings",
    });
  }
};

// UPDATE SETTINGS
const updateSettings = async (req, res) => {
  try {
    const settings = await SystemSettings.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Settings saved successfully!",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save settings",
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
