//neither creating a express app,nor does it handle HTTP requests or listen on a port
// that's why no need of cors 
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,  // your Gmail
    pass: process.env.SMTP_PASS   // your Gmail app password
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const otp =generateOTP();


async function sendOTPEmail(recipientEmail, otp, message) {
  //  console.log("Sending email with OTP:", otp);
  //  console.log("Custom message:", message);
  const mailOptions = {
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: 'Your Login OTP',
    text: `***Your OTP is ***\n ${otp}\n\n${message}`,            // added message here
    html: `
    <h2 style="color: #2e6c80;">Your OTP Code</h2>
    <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
    <p>${message}</p>
    `,  // added message here
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP email sent: ${info.response}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
}


module.exports = { sendOTPEmail, generateOTP };
