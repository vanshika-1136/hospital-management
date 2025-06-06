
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;


//to render the form
// import React from "react";
// import EmailForm from "./EmailForm";
// import "./App.css";
// function App() {
//   return (
//     <div className="app-container">
//       <h1 className="heading">Send OTP Email</h1>
//       <div className="form-wrapper">
//         <EmailForm />
//       </div>
//     </div>
//   );
// }

// export default App;

