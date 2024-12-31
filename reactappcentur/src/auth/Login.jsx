import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../services/BackendAPIUrl";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  //   useEffect(() => {
  //     const isLoggedIn = localStorage.getItem("userData");
  //     if (!isLoggedIn) {
  //         window.location.href = "/centurmanagement/admin-login";
  //     }
  // }, []);

  // const handleLogin = () => {
  //       axios
  //       .post(apiUrl+"api/login", { email, password })
  //       .then((response) => {
  //           console.log(email+password);
  //           console.log("Login successful:", response.data);
  //           window.location.href = "/centurmanagement/admin-dashboard";
  //       })
  //       .catch((error) => {
  //           // Handle error
  //           console.error("Login error:", error);
  //           alert("Login failed. Please try again.");
  //       });
  // };
  const handleLogin = () => {
    axios
    .post(apiUrl + "api/login", { email, password })
    .then((response) => {

        localStorage.setItem('userData', JSON.stringify(response.data));
        window.location.href = "/centurmanagement/admin-dashboard";
    })
    .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
    });
  };


  return (
    <div
      className="ui container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="ui segment">
        <h1 style={{ textAlign: "center" }}>Admin Login</h1>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="ui button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
