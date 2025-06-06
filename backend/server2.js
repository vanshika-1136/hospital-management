const express = require('express');
const cors = require('cors');
const { sendOTPEmail, generateOTP } = require('./OTPMailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OTPStore = {}; // { email: { OTP, expiresAt } }

function saveOTP(email, otp,name,password) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  OTPStore[email] = { otp:String(otp), expiresAt ,name,password};
}

//  1. Signup otp Route
app.post('/api/send-OTP-signup', async (req, res) => {
  const { name, email,password } = req.body;

  if (!name || !email ||!password) {
    return res.status(400).json({ error: 'Name and email and password are required for signup.' });
  }

  const otp= generateOTP();
  saveOTP(email, otp,name,password);

  const message = `Hi ${name}, yourotpfor signup is: ${otp}. It expires in 5 minutes.`;

  try {
    await sendOTPEmail(email, otp, message);
    res.json({ message: 'Signup otp sent to your email.' });
  } catch (err) {
    console.error('Signup otp Error:', err);
    res.status(500).json({ error: 'Failed to send signup OTP' });
  }
});

// 2. Login otp Route
app.post('/api/send-OTP-login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required for login.' });
  }

  const otp= generateOTP();
  saveOTP(email, otp,name,password=null);

  const message = `Your otp for login is: ${otp}. It expires in 5 minutes.`;

  try {
    await sendOTPEmail(email, otp, message);
    res.json({ message: 'Login otp sent to your email.' });
  } catch (err) {
    console.error('Login otp Error:', err);
    res.status(500).json({ error: 'Failed to send login OTP' });
  }
});

// 3.otp Verification (same for both login and signup)
app.post('/api/verify-OTP', (req, res) => {
  const { email,otp} = req.body;
  const record = OTPStore[email];

  if (!record) {
    return res.status(400).json({ error: 'No otp found for this email' });
  }

  if (Date.now() > record.expiresAt) {
    delete OTPStore[email];
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (String(record.otp )!== String(otp)) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
   console.log("Stored OTP:", record.otp);
   console.log("Received OTP:", otp);

  if (record.password) {
  console.log("New signup:", {
    email,
    name: record.name,
    password: record.password, // hash this in real apps
  });
}

  delete OTPStore[email];
  res.json({ message: 'OTP verified successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Express routes example
app.post("/forgot-password/send-OTP", async (req, res) => {
  const { email } = req.body;
  const otp= generateOTP();
  await storeOTP(email, otp); // Save in DB or memory
  await sendOTPEmail(email, otp);
  res.json({ success: true });
});

app.post("/forgot-password/verify-OTP", async (req, res) => {
  const { email,otp} = req.body;
  const isValid = await verifyOTP(email, otp);
  res.json({ success: isValid });
});

app.post("/forgot-password/reset", async (req, res) => {
  const { email, newPassword } = req.body;
  await updateUserPassword(email, newPassword); // Hash it!
  res.json({ success: true });
});








// const express = require('express');
// const cors = require('cors');
// const { sendOTPEmail, generateOTP } = require('./OTPMailer');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const OTPStore = {}; // { email: { OTP, expiresAt } }


// // function saveOTP(email, OTP) {
// //   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
// //   OTPStore[email] = { OTP, expiresAt };
// // }


// // 1️⃣ API: Send OTP
// app.post('/api/send-OTP', async (req, res) => {
//   const { email, name } = req.body;

//   if (!email || !name) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }

//   constotp= generateOTP();
//   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min expiry
//   OTPStore[email] = { OTP, expiresAt };

//   const message = ` It expires in 5 minutes.`;

//   try {
//     await sendOTPEmail(email, OTP, message);
//     res.json({ message: 'OTP sent to your email.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to send OTP' });
//   }
// });

// //  API: Verify OTP
// app.post('/api/verify-OTP', (req, res) => {
//   const { email,otp} = req.body;
//   const record = OTPStore[email];

//   if (!record) {
//     return res.status(400).json({ error: 'Nootpfound for this email' });
//   }

//   if (Date.now() > record.expiresAt) {
//     delete OTPStore[email];
//     return res.status(400).json({ error: 'OTP expired' });
//   }

//   if (record.OTP !== OTP) {
//     return res.status(400).json({ error: 'Invalid OTP' });
//   }

//   delete OTPStore[email];
//   res.json({ message: 'OTP verified successfully' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

