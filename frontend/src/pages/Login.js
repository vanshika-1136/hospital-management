import React from "react";
import { Link } from "react-router-dom";
import EmailForm from "../components/EmailForm";

function Login() {
  return (
    <div>
      <h2>Login via Email OTP</h2>
      <EmailForm mode="login" />
      <p>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;

