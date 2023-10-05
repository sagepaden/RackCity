import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../AdminContext/UserContext";
import axios from "axios"; // Import Axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    try {
      const data = new URLSearchParams();
      data.append("grant_type", "");
      data.append("username", email);
      data.append("password", password);
      data.append("scope", "");
      data.append("client_id", "");
      data.append("client_secret", "");

      const response = await axios.post("/api/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setToken(data.access_token);
      } else {
        const errorData = response.data;
        setErrorMessage(errorData.detail);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      setErrorMessage("Something went wrong during login.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
