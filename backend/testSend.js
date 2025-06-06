const { sendOTPEmail, generateOTP } = require('./otpMailer');

async function testEmail() {
  const otp = generateOTP();  // e.g., "123456"
  const message = "It expires in 5 minutes. Please do not share it.";

  await sendOTPEmail("recipient@example.com", otp, message);
}

testEmail().catch(console.error);