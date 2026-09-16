const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const cloudinary = require("../config/cloudinary");

async function generateCertificate(application) {
  // =========================================================
  // QR VERIFICATION URL
  // =========================================================

  const baseUrl =
    process.env.APP_BASE_URL || "http://localhost:5000";

  const verifyUrl = `${baseUrl}/api/applications/verify/${application._id}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 180,
    margin: 1,
  });

  const qrImageBuffer = Buffer.from(
    qrDataUrl.split(",")[1],
    "base64"
  );

  // =========================================================
  // APPLICATION DATA
  // =========================================================

  const applicantName =
    application.applicantDetails?.fullName || "N/A";

  const municipality =
    application.address?.municipality || "MUNICIPALITY";

  const wardNumber =
    application.address?.wardNumber || "N/A";

  const district =
    application.address?.district || "N/A";

  const tole =
    application.address?.tole || "N/A";

  const service =
    application.service || "Recommendation Service";

  const applicationNumber =
    application.applicationNumber || "N/A";

  const issueDate = new Date().toLocaleDateString("en-GB");

  const certificateNumber =
    `EW-${applicationNumber}`;

  // =========================================================
  // PDF DOCUMENT
  // =========================================================

  const doc = new PDFDocument({
    size: "A4",
    margin: 45,
  });

  const chunks = [];

  doc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  const pdfBufferPromise = new Promise((resolve, reject) => {
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);
  });

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const left = 45;
  const right = pageWidth - 45;
  const contentWidth = right - left;

  // =========================================================
  // COLORS
  // =========================================================

  const dark = "#1F2937";
  const gray = "#6B7280";
  const lightGray = "#F3F4F6";
  const border = "#D1D5DB";

  // =========================================================
  // OUTER BORDER
  // =========================================================

  doc
    .lineWidth(1.5)
    .rect(
      25,
      25,
      pageWidth - 50,
      pageHeight - 50
    )
    .stroke(dark);

  // Inner border

  doc
    .lineWidth(0.5)
    .rect(
      31,
      31,
      pageWidth - 62,
      pageHeight - 62
    )
    .stroke(border);

  // =========================================================
  // HEADER
  // =========================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(dark)
    .text("GOVERNMENT OF NEPAL", left, 55, {
      width: contentWidth,
      align: "center",
    });

  doc
    .fontSize(16)
    .text(municipality.toUpperCase(), left, 73, {
      width: contentWidth,
      align: "center",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(
      `WARD OFFICE - ${wardNumber}`,
      left,
      96,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(gray)
    .text(
      `${district}, Nepal`,
      left,
      114,
      {
        width: contentWidth,
        align: "center",
      }
    );

  // =========================================================
  // HEADER DIVIDER
  // =========================================================

  doc
    .moveTo(90, 135)
    .lineTo(pageWidth - 90, 135)
    .lineWidth(1)
    .stroke(dark);

  // =========================================================
  // TITLE
  // =========================================================

  doc
    .fillColor(dark)
    .font("Helvetica-Bold")
    .fontSize(19)
    .text(
      "WARD RECOMMENDATION",
      left,
      155,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc
    .fontSize(15)
    .text(
      "CERTIFICATE",
      left,
      180,
      {
        width: contentWidth,
        align: "center",
      }
    );

  // =========================================================
  // DOCUMENT INFORMATION
  // =========================================================

  const infoTop = 215;
  const infoHeight = 58;

  doc
    .roundedRect(
      left,
      infoTop,
      contentWidth,
      infoHeight,
      4
    )
    .fillAndStroke(lightGray, border);

  doc
    .fillColor(dark)
    .font("Helvetica-Bold")
    .fontSize(8)
    .text(
      "CERTIFICATE NUMBER",
      left + 15,
      infoTop + 11
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      certificateNumber,
      left + 15,
      infoTop + 27
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text(
      "APPLICATION NUMBER",
      left + 205,
      infoTop + 11
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      applicationNumber,
      left + 205,
      infoTop + 27
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text(
      "DATE OF ISSUE",
      left + 390,
      infoTop + 11
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      issueDate,
      left + 390,
      infoTop + 27
    );

  // =========================================================
  // APPLICANT DETAILS HEADING
  // =========================================================

  const applicantTop = 300;

  doc
    .fillColor(dark)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(
      "1. APPLICANT DETAILS",
      left,
      applicantTop
    );

  doc
    .moveTo(left, applicantTop + 18)
    .lineTo(right, applicantTop + 18)
    .lineWidth(0.7)
    .stroke(border);

  // =========================================================
  // APPLICANT DETAILS BOX
  // =========================================================

  const detailsTop = applicantTop + 30;
  const detailsHeight = 105;

  doc
    .roundedRect(
      left,
      detailsTop,
      contentWidth,
      detailsHeight,
      4
    )
    .stroke(border);

  // Vertical divider

  doc
    .moveTo(190, detailsTop)
    .lineTo(190, detailsTop + detailsHeight)
    .lineWidth(0.5)
    .stroke(border);

  // Row dividers

  doc
    .moveTo(left, detailsTop + 35)
    .lineTo(right, detailsTop + 35)
    .stroke(border);

  doc
    .moveTo(left, detailsTop + 70)
    .lineTo(right, detailsTop + 70)
    .stroke(border);

  // Full Name

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(gray)
    .text(
      "Full Name",
      left + 10,
      detailsTop + 13
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(dark)
    .text(
      applicantName,
      200,
      detailsTop + 12
    );

  // Address

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(gray)
    .text(
      "Address",
      left + 10,
      detailsTop + 48
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(dark)
    .text(
      `${tole}, Ward No. ${wardNumber}, ${municipality}, ${district}`,
      200,
      detailsTop + 47,
      {
        width: right - 200 - 10,
      }
    );

  // District

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(gray)
    .text(
      "District",
      left + 10,
      detailsTop + 83
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(dark)
    .text(
      district,
      200,
      detailsTop + 82
    );

  // =========================================================
  // RECOMMENDATION SECTION
  // =========================================================

  const recommendationTop = 455;

  doc
    .fillColor(dark)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(
      "2. RECOMMENDATION",
      left,
      recommendationTop
    );

  doc
    .moveTo(left, recommendationTop + 18)
    .lineTo(right, recommendationTop + 18)
    .lineWidth(0.7)
    .stroke(border);

  // =========================================================
  // MAIN CERTIFICATE TEXT
  // =========================================================

  doc
    .fillColor(dark)
    .font("Helvetica")
    .fontSize(11)
    .text(
      "This is to certify that",
      left,
      recommendationTop + 35,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(
      applicantName,
      left,
      recommendationTop + 56,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      "has been issued this ward recommendation for the following service:",
      left,
      recommendationTop + 83,
      {
        width: contentWidth,
        align: "center",
      }
    );

  // =========================================================
  // SERVICE BOX
  // =========================================================

  doc
    .roundedRect(
      left + 35,
      recommendationTop + 108,
      contentWidth - 70,
      45,
      4
    )
    .fillAndStroke(lightGray, border);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(dark)
    .text(
      service,
      left + 50,
      recommendationTop + 124,
      {
        width: contentWidth - 100,
        align: "center",
      }
    );

  // =========================================================
  // APPROVAL STATEMENT
  // =========================================================

  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(dark)
    .text(
      "The application has been reviewed and approved by the concerned authorities through the E-Ward Sifarish digital system.",
      left + 20,
      recommendationTop + 170,
      {
        width: contentWidth - 40,
        align: "justify",
        lineGap: 3,
      }
    );

  // =========================================================
  // LOWER SECTION
  // =========================================================

  const lowerTop = 650;

  // =========================================================
  // AUTHORIZED OFFICER
  // =========================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(dark)
    .text(
      "AUTHORIZED OFFICER",
      left + 20,
      lowerTop
    );

  doc
    .moveTo(left + 20, lowerTop + 45)
    .lineTo(left + 180, lowerTop + 45)
    .lineWidth(0.7)
    .stroke(dark);

  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Signature",
      left + 20,
      lowerTop + 51
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      "Chairperson / Authorized Officer",
      left + 20,
      lowerTop + 70
    );

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(gray)
    .text(
      `Ward Office, ${municipality}`,
      left + 20,
      lowerTop + 86
    );

  // =========================================================
  // QR VERIFICATION
  // =========================================================

  const qrX = right - 150;

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(dark)
    .text(
      "CERTIFICATE VERIFICATION",
      qrX - 25,
      lowerTop,
      {
        width: 150,
        align: "center",
      }
    );

  doc.image(
    qrImageBuffer,
    qrX,
    lowerTop + 25,
    {
      fit: [105, 105],
      align: "center",
    }
  );

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(gray)
    .text(
      "Scan the QR code to verify",
      qrX - 20,
      lowerTop + 135,
      {
        width: 145,
        align: "center",
      }
    );

  doc.text(
    "this certificate online.",
    qrX - 20,
    lowerTop + 147,
    {
      width: 145,
      align: "center",
    }
  );

  // =========================================================
  // FOOTER
  // =========================================================

  const footerY = pageHeight - 82;

  doc
    .moveTo(left + 20, footerY - 10)
    .lineTo(right - 20, footerY - 10)
    .lineWidth(0.5)
    .stroke(border);

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(gray)
    .text(
      "This is a digitally generated certificate issued through the E-Ward Sifarish System.",
      left,
      footerY,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc.text(
    "Certificate authenticity can be verified by scanning the QR code.",
    left,
    footerY + 12,
    {
      width: contentWidth,
      align: "center",
    }
  );

  // =========================================================
  // END PDF
  // =========================================================

  doc.end();

  const pdfBuffer = await pdfBufferPromise;

  // =========================================================
  // UPLOAD CERTIFICATE TO CLOUDINARY
  // =========================================================

  const uploadResult = await new Promise(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder: "e-ward-sifarish/certificates",
            resource_type: "raw",
            public_id: `certificate-${application._id}`,
            format: "pdf",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

      uploadStream.end(pdfBuffer);
    }
  );

  // =========================================================
  // RETURN CERTIFICATE INFORMATION
  // =========================================================

  return {
    filePath: uploadResult.secure_url,
    qrData: verifyUrl,
  };
}

module.exports = { generateCertificate };