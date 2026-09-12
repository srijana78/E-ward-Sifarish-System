// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema(
//   {
//     // ================= SERVICE =================
//     service: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // ================= USER =================
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // ================= APPLICANT DETAILS =================
//     applicantDetails: {
//       fullName: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       citizenshipNumber: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       dateOfBirth: {
//         type: Date,
//         required: true,
//       },

//       phone: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       email: {
//         type: String,
//         trim: true,
//         default: "",
//       },
//     },

//     // ================= ADDRESS =================
//     address: {
//       province: { type: String, default: "" },
//       district: { type: String, default: "" },
//       municipality: { type: String, default: "" },
//       wardNumber: { type: String, default: "" },
//       tole: { type: String, default: "" },
//     },

//     // ================= DOCUMENTS =================
//     documents: [
//       {
//         documentType: {
//           type: String,
//           required: true,
//         },

//         fileName: {
//           type: String,
//           required: true,
//         },

//         fileUrl: {
//           type: String,
//           required: true,
//         },

//         fileType: {
//           type: String,
//           default: "",
//         },

//         fileSize: {
//           type: Number,
//           default: 0,
//         },
//       },
//     ],

//     // ================= PAYMENT =================
//     payment: {
//       required: {
//         type: Boolean,
//         default: true,
//       },

//       amount: {
//         type: Number,
//         default: 0,
//       },

//       voucherName: {
//         type: String,
//         default: "",
//       },

//       voucherUrl: {
//         type: String,
//         default: "",
//       },

//       voucherType: {
//         type: String,
//         default: "",
//       },

//       voucherSize: {
//         type: Number,
//         default: 0,
//       },

//       status: {
//         type: String,
//         enum: ["not_required", "pending", "paid", "verified"],
//         default: "pending",
//       },
//     },

//     // ================= WORKFLOW =================
//     status: {
//       type: String,
//       enum: [
//         "draft",
//         "submitted",
//         "pending",
//         "under_review",
//         "verified",
//         "recommended",
//         "approved",
//         "rejected",
//       ],
//       default: "draft",
//     },

//     // ================= REMARKS =================
//     frontOfficeRemarks: {
//       type: String,
//       default: "",
//     },

//     secretaryRemarks: {
//       type: String,
//       default: "",
//     },

//     chairpersonRemarks: {
//       type: String,
//       default: "",
//     },

//     // ================= APPLICATION NUMBER =================
//     applicationNumber: {
//       type: String,
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ================= GENERATE APPLICATION NUMBER =================
// applicationSchema.pre("save", function (next) {
//   if (!this.applicationNumber) {
//     this.applicationNumber = `APP-${Date.now()}`;
//   }

//   next();
// });

// const Application = mongoose.model("Application", applicationSchema);

// module.exports = Application;

// claue hehe
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // ================= SERVICE =================
    service: {
      type: String,
      required: true,
      trim: true,
    },

    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= APPLICANT DETAILS =================
    applicantDetails: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      citizenshipNumber: {
        type: String,
        required: true,
        trim: true,
      },

      dateOfBirth: {
        type: Date,
        required: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // ================= ADDRESS =================
    address: {
      province: { type: String, default: "" },
      district: { type: String, default: "" },
      municipality: { type: String, default: "" },
      wardNumber: { type: String, default: "" },
      tole: { type: String, default: "" },
    },

    // ================= DOCUMENTS =================
    documents: [
      {
        documentType: {
          type: String,
          required: true,
        },

        fileName: {
          type: String,
          required: true,
        },

        fileUrl: {
          type: String,
          required: true,
        },

        fileType: {
          type: String,
          default: "",
        },

        fileSize: {
          type: Number,
          default: 0,
        },
      },
    ],

    // ================= PAYMENT =================
    payment: {
      required: {
        type: Boolean,
        default: true,
      },

      amount: {
        type: Number,
        default: 0,
      },

      voucherName: {
        type: String,
        default: "",
      },

      voucherUrl: {
        type: String,
        default: "",
      },

      voucherType: {
        type: String,
        default: "",
      },

      voucherSize: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: ["not_required", "pending", "paid", "verified"],
        default: "pending",
      },
    },

    // ================= WORKFLOW =================
    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "pending",
        "under_review",
        "verified",
        "recommended",
        "approved",
        "rejected",
      ],
      default: "draft",
    },

    // ================= WORKFLOW STAGE OWNER =================
    // Tells each dashboard whose queue this application currently sits in.
    // 'completed' means it's terminal (approved or rejected).
    currentStage: {
      type: String,
      enum: ["frontoffice", "secretary", "chairperson", "completed"],
      default: "frontoffice",
    },

    // Which role rejected it, if status === 'rejected'
    rejectedBy: {
      type: String,
      enum: ["frontoffice", "secretary", "chairperson"],
      default: null,
    },

    // ================= REMARKS =================
    frontOfficeRemarks: {
      type: String,
      default: "",
    },

    secretaryRemarks: {
      type: String,
      default: "",
    },

    chairpersonRemarks: {
      type: String,
      default: "",
    },

    // ================= CERTIFICATE =================
    // Populated once the chairperson approves the application
    certificate: {
      filePath: { type: String, default: "" },
      qrData: { type: String, default: "" },
      generatedAt: { type: Date },
    },

    // ================= APPLICATION NUMBER =================
    applicationNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// ================= GENERATE APPLICATION NUMBER =================
applicationSchema.pre("save", function (next) {
  if (!this.applicationNumber) {
    this.applicationNumber = `APP-${Date.now()}`;
  }

  // next();
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;