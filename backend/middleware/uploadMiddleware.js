const multer = require("multer");
const path = require("path");
const fs = require("fs");

const documentsPath = path.join(__dirname, "../uploads/documents");
const vouchersPath = path.join(__dirname, "../uploads/vouchers");

// Create folders automatically if they don't exist
fs.mkdirSync(documentsPath, { recursive: true });
fs.mkdirSync(vouchersPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "documents") {
      cb(null, documentsPath);
    } else if (file.fieldname === "voucher") {
      cb(null, vouchersPath);
    } else {
      cb(new Error("Invalid upload field"));
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, JPEG and PNG files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;