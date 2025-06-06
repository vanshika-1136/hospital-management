import React, { useState } from "react";
import "./EmailForm.css";
//https://script.google.com/macros/s/AKfycbxL5rDIBIgk9LnpzDr4LCAsiwR9qReWHgyIiaWkillmHbAKTGpK_rxeSzDov5YO75Ha/exec
//https://script.google.com/macros/s/AKfycbxL5rDIBIgk9LnpzDr4LCAsiwR9qReWHgyIiaWkillmHbAKTGpK_rxeSzDov5YO75Ha/exec
function EmailForm({ mode }) {
  const [step, setStep] = useState("input");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setotp] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    const url = mode === "signup" 
      ? "http://localhost:5000/api/send-OTP-signup" 
      : "http://localhost:5000/api/send-OTP-login";

      const payload=
      mode==="signup"?{name,email,password}:{email};

      const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( payload ), //backend m jayega payload
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) setStep("otp");
    // }catch(error) {
    //   console.error("Error sending otp:", error);
    // }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) {
      alert(`${mode === "signup" ? "Signup" : "Login"} successful!`);
      handleSubmitToSheet();
    }
    // catch (error) {
    //   console.error("Error verifying otp:", error);
    // }

  };


  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   const url="https://script.google.com/macros/s/AKfycbxL5rDIBIgk9LnpzDr4LCAsiwR9qReWHgyIiaWkillmHbAKTGpK_rxeSzDov5YO75Ha/exec"
  //   fetch(url,{
  //     method:"POST",
  //     headers: { "Content-Type": "application/json" },
  //     body:(`Name=${e.target.name.value} &otp=${e.target.otp.value}`)
  //   }).then(res=>res.text()).then(data=>{
  //     alert(data)
  //   }).catch(error=>console.log(error))
  // }

const handleSubmitToSheet = () => {
  console.log("Saving to sheet:", { email,otp, password });
  const url = "https://script.google.com/macros/s/AKfycbxL5rDIBIgk9LnpzDr4LCAsiwR9qReWHgyIiaWkillmHbAKTGpK_rxeSzDov5YO75Ha/exec";

  const formData = new FormData();
  formData.append("email", email);
   formData.append("otp", otp);   // lowercase key "email"
  formData.append("password", password);      // lowercase key "otp"
  
  console.log(email, password);

  fetch(url, {
    method: "POST",
    body: formData,
  })
  .then(res => res.text())
  .then(data => {
    alert("Saved to Google Sheet: " + data);
  })
  .catch(err => console.log("Error saving to Sheet", err));
};





  return (
    <div>
      {step === "input" ? (
        <form onSubmit={handleSend}>
          {mode === "signup" && (
            <>
            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <button type="submit">Send otp</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            placeholder="Enter otp"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            required
          />
          <button type="submit">Verify otp</button>
        </form>
      )}
    </div>
  );
}

export default EmailForm;



// import React, { useState } from "react";
// import "./EmailForm.css"; 

// function EmailForm() {
//   const [step, setStep] = useState("input"); // input → otp
//   const [name, setName] = useState("");
//   const [email, setemail] = useState("");
//   const [otp, setotp] = useState("");

//     const handleSend = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email }),
//     });

//     const data = await res.json();
//     alert(data.message || data.error);
//     if (res.ok) setStep("otp");
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();
//     alert(data.message || data.error);
//   };

//   return (
//     <div>
//       {step === "input" ? (
//         <form onSubmit={handleSend}>
//           <input
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             placeholder="Your email"
//             type="email"
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
//             required
//           />
//           <button type="submit">Send otp</button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerify}>
//           <input
//             placeholder="Enter otp"
//             value={otp}
//             onChange={(e) => setotp(e.target.value)}
//             required
//           />
//           <button type="submit">Verify otp</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default EmailForm;

