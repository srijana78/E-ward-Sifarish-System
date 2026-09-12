// npm install pdfkit qrcode
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

async function generateCertificate(application) {
  // PUBLIC (no-auth) route the QR code links to — see verifyCertificate in the controller
  const baseUrl = process.env.APP_BASE_URL || "http://localhost:5000";
  const verifyUrl = `${baseUrl}/verify/${application._id}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl);
  const qrImageBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");

  const outputDir = path.join(__dirname, "..", "uploads", "certificates");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const fileName = `certificate-${application._id}.pdf`;
  const filePath = path.join(outputDir, fileName);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text("Ward Recommendation Certificate", { align: "center" });
  doc.moveDown(1.5);
  doc.fontSize(12).text(`Application No: ${application.applicationNumber}`);
  doc.text(`Applicant: ${application.applicantDetails.fullName}`);
  doc.text(`Service: ${application.service}`);
  doc.text(`Approved On: ${new Date().toLocaleDateString()}`);
  doc.moveDown(1);
  doc.text("This certificate was issued through the E-Ward Sifarish digital verification system.");
  doc.moveDown(1);

  doc.image(qrImageBuffer, { fit: [120, 120] });
  doc.moveDown(0.5);
  doc.fontSize(9).fillColor("gray").text("Scan the QR code above to verify this certificate online.");

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () =>
      resolve({
        filePath: `/uploads/certificates/${fileName}`,
        qrData: verifyUrl,
      })
    );
    stream.on("error", reject);
  });
}

module.exports = { generateCertificate };