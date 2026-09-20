const Application = require("../models/Application");

const { generateCertificate } = require("../utils/certificateGenerator");

const { createNotification } = require("./notificaionController");

const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Official, human-readable name for each stage role — used in rejection
// notices so the citizen sees "Front Office" / "Secretary" / "Chairperson"
// rather than the raw internal role string.
const STAGE_LABELS = {
  frontoffice: "Front Office",
  secretary: "Secretary",
  chairperson: "Chairperson",
};

// Builds a formal rejection notice. Used identically by all three stages
// so the tone and structure stay consistent regardless of which desk
// rejected the application.
function buildRejectionNotice(application, stageKey, remarks) {
  const roleLabel = STAGE_LABELS[stageKey] || stageKey;
  const decisionDate = new Date().toLocaleDateString("en-GB");
  const reason = remarks && remarks.trim() ? remarks.trim() : "No reason was provided.";

  return {
    title: "Application Rejected",
    message: `Application No. ${application.applicationNumber} for ${application.service} has been reviewed and rejected by the ${roleLabel} on ${decisionDate}. Stated reason: ${reason} For further clarification, please contact the ward office.`,
  };
}

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

    // Upload application documents to Cloudinary — in parallel, since each
    // upload is independent and this was previously awaited one at a time,
    // which meant 5 documents took 5x as long as they needed to.
    const uploadResults = await Promise.all(
      documentFiles.map((file) =>
        uploadToCloudinary(file, "e-ward-sifarish/documents")
      )
    );

    const documents = [];

    for (let i = 0; i < documentFiles.length; i++) {
      const file = documentFiles[i];
      const result = uploadResults[i];

      documents.push({
        documentType: typeList[i] || "other",
        fileName: file.originalname,
        fileUrl: result.secure_url,
        fileType: file.mimetype,
        fileSize: file.size,
      });
    }

    const voucherFile = req.files?.voucher?.[0];

    const payment = {
      required: true,
      amount: Number(amount) || 0,
      status: voucherFile ? "paid" : "pending",
    };

    // Upload payment voucher to Cloudinary
    if (voucherFile) {
      const voucherResult = await uploadToCloudinary(
        voucherFile,
        "e-ward-sifarish/vouchers"
      );

      payment.voucherName = voucherFile.originalname;
      payment.voucherUrl = voucherResult.secure_url;
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
    console.error("Application submission error:", err);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      const notice = buildRejectionNotice(application, "frontoffice", remarks);
      await createNotification({
        title: notice.title,
        message: notice.message,
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
      message: "Server error. Please try again.",
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
      const notice = buildRejectionNotice(application, "secretary", remarks);
      await createNotification({
        title: notice.title,
        message: notice.message,
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
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      const notice = buildRejectionNotice(application, "chairperson", remarks);
      await createNotification({
        title: notice.title,
        message: notice.message,
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
    console.error("Chairperson action error:", err);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
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
      message: "Server error. Please try again.",
    });
  }
};