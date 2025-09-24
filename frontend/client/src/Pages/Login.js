import React, { useEffect, useState } from "react";
import Image from "../Assets/image.png";
import Logo from "../Assets/logo.png";
// import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          formData
        );
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        toast.success("Login successfull");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                 <button type="submit">Log In</button>
                 {/* <button type="submit">
                   <img src={GoogleSvg} alt="" />
                   Log In with Google
                 </button> */}
               </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logo, background } from "../Assets/index";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const loginUser = async (event) => {
//     event.preventDefault();
//     const response = await fetch("http://localhost:5000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//     const data = await response.json();
//     if (data.success) {
//       navigate("/Dashboard");
//     } else {
//       alert("Invalid email or password");
//     }
//   };
//   return (
//     <div
//       className="flex flex-col items-center justify-center h-screen"
//       style={{
//         backgroundImage: `url(${background})`,
//         backgroundSize: "cover",
//       }}>
//       <div className="text-center">
//         <img
//           className="w-80 h-70 mb-auto sm:mb-20 mx-auto min-w-[150px]"
//           src={logo}
//           alt="logo"
//         />
//         <form onSubmit={loginUser} className="mx-auto mt-4 text-left">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-600 text-left">
//               Login
//             </h1>
//             <p className="text-gray-500 text-left">
//               Need an account?{" "}
//               <span
//                 onClick={(e) => navigate("/register")}
//                 className="text-lime-500 cursor-pointer">
//                 Sign Up
//               </span>
//             </p>
//           </div>
//           <div className="text-left">
//             <label className="block mb-1">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               type="email"
//               className="w-full px-4 py-2 border rounded-lg mb-4"
//             />
//           </div>
//           <div className="text-left">
//             <label className="block mb-1">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               type="password"
//               className="w-full px-4 py-2 border rounded-lg mb-4"
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               type="submit"
//               className="bg-lime-500 text-white py-2 px-4 rounded-sm">
//               Login
//             </button>
//             <span className="text-sm text-gray-500 cursor-pointer">
//               Forget password ?
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
