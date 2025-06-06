import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/forgot-password/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } else {
      alert("Failed to send OTP");
    }
  };

  return (
    <form onSubmit={handleSendOTP}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
}

export default ForgotPassword;

