import React from "react";
import { Link } from "react-router-dom";
import EmailForm from "../components/EmailForm";

function Signup() {
  return (
    <div>
      <h2>Signup via Email OTP</h2>
      <EmailForm mode="signup" />
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;

