const nodemailer = require("nodemailer");

// Reused across calls instead of recreating a transporter every time.
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS in backend/.env"
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    // Port 465 is the standard SMTPS port and requires an implicit TLS
    // connection from the start; every other port (587, 25, ...) uses
    // STARTTLS instead, which nodemailer negotiates when secure: false.
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

// ==========================================
// SEND PASSWORD RESET EMAIL — STAFF
// ==========================================

async function sendPasswordResetEmail(toEmail, resetLink) {
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;

  const mailOptions = {
    from: `"E-Ward Sifarish System" <${fromAddress}>`,
    to: toEmail,
    subject: "Reset your E-Ward Sifarish System password",
    text:
      `A password reset was requested for your account.\n\n` +
      `Reset your password using the link below (valid for 1 hour):\n${resetLink}\n\n` +
      `If you did not request this, you can safely ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#1F2937;">Reset your password</h2>
        <p style="color:#374151;">A password reset was requested for your E-Ward Sifarish System account.</p>
        <p style="margin: 24px 0;">
          <a href="${resetLink}"
             style="background:#4F46E5; color:#ffffff; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Reset Password
          </a>
        </p>
        <p style="color:#6B7280; font-size:13px;">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  };

  await getTransporter().sendMail(mailOptions);
}

module.exports = { sendPasswordResetEmail };
