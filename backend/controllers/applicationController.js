const Application = require("../models/Application");

const { generateCertificate } = require("../utils/certificateGenerator");

const { createNotification } = require("./notificaionController");

// ---------- CITIZEN ----------

// POST /api/applications

// multipart/form-data:
//   text: service, fullName, citizenshipNumber, dateOfBirth, phone, email,
//         province, district, municipality, wardNumber, tole, amount,
//         documentTypes (JSON string array, one entry per uploaded document, same order)
//   files: documents (multiple), voucher (single, optional)

exports.submitApplication = async (req, res) => {
  try {
    const {
      service,
      fullName,
      citizenshipNumber,
      dateOfBirth,
      phone,
      email,
      province,
      district,
      municipality,
      wardNumber,
      tole,
      amount,
      documentTypes,
    } = req.body;

    if (
      !service ||
      !fullName ||
      !citizenshipNumber ||
      !dateOfBirth ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "service, fullName, citizenshipNumber, dateOfBirth and phone are required",
      });
    }

    const documentFiles = req.files?.documents || [];

    if (documentFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one document is required",
      });
    }

    let typeList = [];

    try {
      typeList = documentTypes
        ? JSON.parse(documentTypes)
        : [];
    } catch {
      typeList = [];
    }

    const documents = documentFiles.map((f, i) => ({
      documentType: typeList[i] || "other",
      fileName: f.originalname,
      fileUrl: `/uploads/documents/${f.filename}`,
      fileType: f.mimetype,
      fileSize: f.size,
    }));

    const voucherFile = req.files?.voucher?.[0];

    const payment = {
      required: true,
      amount: Number(amount) || 0,
      status: voucherFile ? "paid" : "pending",
    };

    if (voucherFile) {
      payment.voucherName = voucherFile.originalname;
      payment.voucherUrl = `/uploads/vouchers/${voucherFile.filename}`;
      payment.voucherType = voucherFile.mimetype;
      payment.voucherSize = voucherFile.size;
    }

    const application = await Application.create({
      service,
      user: req.user.id,

      applicantDetails: {
        fullName,
        citizenshipNumber,
        dateOfBirth,
        phone,
        email,
      },

      address: {
        province,
        district,
        municipality,
        wardNumber,
        tole,
      },

      documents,

      payment,

      status: "submitted",

      currentStage: "frontoffice",
    });

    // Alert the front office queue that a new application needs review

    await createNotification({
      title: "New application submitted",
      message: `${fullName} submitted a ${service} application (${application.applicationNumber}).`,
      type: "application",
      application: application._id,
      recipientRole: "frontoffice",
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/applications/my

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------- SHARED ----------

// GET /api/applications/:id

exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    ).populate("user", "name phone email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const isOwner =
      application.user._id.toString() === req.user.id;

    const isStaff = [
      "frontoffice",
      "secretary",
      "chairperson",
      "admin",
    ].includes(req.user.role);

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/applications
// Staff queue, filtered to their stage

exports.listForRole = async (req, res) => {
  try {
    const stageByRole = {
      frontoffice: "frontoffice",
      secretary: "secretary",
      chairperson: "chairperson",
    };

    // admin -> no filter

    const stage = stageByRole[req.user.role];

    const filter = stage
      ? { currentStage: stage }
      : {};

    const applications = await Application.find(filter)
      .populate("user", "name phone email")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/applications/frontoffice/verified

exports.getFrontOfficeVerified = async (req, res) => {
  try {
    const applications = await Application.find({
      verifiedBy: "frontoffice",
      status: "verified",
      currentStage: "secretary",
    })
      .populate("user", "name phone email")
      .sort({
        verifiedAt: -1,
      });

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------- STAGE ACTIONS ----------

// PATCH /api/applications/:id/frontoffice
// decision: 'verify' | 'reject'

exports.frontOfficeAction = async (req, res) => {
  try {
    const { decision, remarks } = req.body;

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (application.currentStage !== "frontoffice") {
      return res.status(400).json({
        success: false,
        message:
          "Application is not at the front office stage",
      });
    }

    if (decision === "verify") {
      application.status = "verified";

      application.currentStage = "secretary";

      // Mark THIS application as verified by front office

      application.verifiedBy = "frontoffice";

      application.verifiedAt = new Date();

      if (application.payment?.required) {
        application.payment.status = "verified";
      }
    } else if (decision === "reject") {
      application.status = "rejected";

      application.currentStage = "completed";

      application.rejectedBy = "frontoffice";
    } else {
      return res.status(400).json({
        success: false,
        message:
          "decision must be 'verify' or 'reject'",
      });
    }

    application.frontOfficeRemarks = remarks || "";

    await application.save();

    if (decision === "verify") {
      await createNotification({
        title: "Application ready for recommendation",
        message: `${application.applicationNumber} was verified by front office and needs your review.`,
        type: "verified",
        application: application._id,
        recipientRole: "secretary",
      });

      await createNotification({
        title: "Your application was verified",
        message: `Your ${application.service} application (${application.applicationNumber}) passed front office review.`,
        type: "verified",
        application: application.user,
        recipientUser: application.user,
      });
    } else {
      await createNotification({
        title: "Your application was rejected",
        message: `Your ${application.service} application (${application.applicationNumber}) was rejected by front office. Reason: ${
          remarks || "not specified"
        }.`,
        type: "rejected",
        application: application._id,
        recipientUser: application.user,
      });
    }

    res.json({
      success: true,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PATCH /api/applications/:id/secretary
// decision: 'recommend' | 'reject'

exports.secretaryAction = async (req, res) => {
  try {
    const { decision, remarks } = req.body;

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (application.currentStage !== "secretary") {
      return res.status(400).json({
        success: false,
        message:
          "Application is not at the secretary stage",
      });
    }

    if (decision === "recommend") {
      application.status = "recommended";

      application.currentStage = "chairperson";
    } else if (decision === "reject") {
      application.status = "rejected";

      application.currentStage = "completed";

      application.rejectedBy = "secretary";
    } else {
      return res.status(400).json({
        success: false,
        message:
          "decision must be 'recommend' or 'reject'",
      });
    }

    application.secretaryRemarks = remarks || "";

    await application.save();

    if (decision === "recommend") {
      await createNotification({
        title: "Application awaiting final approval",
        message: `${application.applicationNumber} was recommended by the secretary and needs your approval.`,
        type: "recommended",
        application: application._id,
        recipientRole: "chairperson",
      });

      await createNotification({
        title: "Your application was recommended",
        message: `Your ${application.service} application (${application.applicationNumber}) was recommended for final approval.`,
        type: "recommended",
        application: application._id,
        recipientUser: application.user,
      });
    } else {
      await createNotification({
        title: "Your application was rejected",
        message: `Your ${application.service} application (${application.applicationNumber}) was rejected by the secretary. Reason: ${
          remarks || "not specified"
        }.`,
        type: "rejected",
        application: application._id,
        recipientUser: application.user,
      });
    }

    res.json({
      success: true,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSecretaryRecommended = async (req, res) => {
  try {
    const applications = await Application.find({
      status: "recommended",
      currentStage: "chairperson",
    })
      .populate("user", "name phone email")
      .sort({
        updatedAt: -1,
      });

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PATCH /api/applications/:id/chairperson
// decision: 'approve' | 'reject'

exports.chairpersonAction = async (req, res) => {
  try {
    const { decision, remarks } = req.body;

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (application.currentStage !== "chairperson") {
      return res.status(400).json({
        success: false,
        message:
          "Application is not at the chairperson stage",
      });
    }

    if (decision === "approve") {
      application.status = "approved";

      application.currentStage = "completed";

      const cert = await generateCertificate(application);

      application.certificate = {
        filePath: cert.filePath,
        qrData: cert.qrData,
        generatedAt: new Date(),
      };
    } else if (decision === "reject") {
      application.status = "rejected";

      application.currentStage = "completed";

      application.rejectedBy = "chairperson";
    } else {
      return res.status(400).json({
        success: false,
        message:
          "decision must be 'approve' or 'reject'",
      });
    }

    application.chairpersonRemarks = remarks || "";

    await application.save();

    if (decision === "approve") {
      await createNotification({
        title: "Your application was approved",
        message: `Your ${application.service} application (${application.applicationNumber}) was approved. Your certificate is ready to download.`,
        type: "approved",
        application: application._id,
        recipientUser: application.user,
      });
    } else {
      await createNotification({
        title: "Your application was rejected",
        message: `Your ${application.service} application (${application.applicationNumber}) was rejected by the chairperson. Reason: ${
          remarks || "not specified"
        }.`,
        type: "rejected",
        application: application._id,
        recipientUser: application.user,
      });
    }

    res.json({
      success: true,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/applications/verify/:id
// PUBLIC — what the QR code opens

exports.verifyCertificate = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (
      !application ||
      application.status !== "approved"
    ) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: "No valid certificate found",
      });
    }

    res.json({
      success: true,
      valid: true,
      applicationNumber:
        application.applicationNumber,
      applicantName:
        application.applicantDetails.fullName,
      service: application.service,
      approvedOn: application.updatedAt,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------- ADMIN STATISTICS ----------

// GET /api/applications/reports/statistics

exports.getApplicationStatistics = async (req, res) => {
  try {
    const totalApplications =
      await Application.countDocuments();

    const pendingApplications =
      await Application.countDocuments({
        status: {
          $in: [
            "submitted",
            "verified",
            "recommended",
          ],
        },
      });

    const approvedApplications =
      await Application.countDocuments({
        status: "approved",
      });

    res.json({
      success: true,
      statistics: {
        totalApplications,
        pendingApplications,
        approvedApplications,
      },
    });
  } catch (err) {
    console.error(
      "Application statistics error:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};