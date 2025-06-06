// backend api == frontend(e-mail)-->backend api route->sendMail function

const express = require("express"); // server creation from express
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const cors = require("cors");// as frontend & backend r on diff port
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json()); // to accept JSON body from frontend

// Create the transporter for sending mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Define sendMail function
async function sendMail(toEmail, subject, message) {
  const mailOptions = {
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(" Email sent to:", toEmail);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
}

//  API endpoint to receive email from frontend
app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await sendMail(email, subject, message);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
