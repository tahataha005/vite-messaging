import axios from "axios";
import React, { useState } from "react";

const Auth = () => {
  const [authState, setAuthState] = useState("login");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    tunnel: "",
  });

  return (
    <div>
      {authState === "login" ? (
        <div>
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <button
            onClick={async () => {
              console.log(credentials);

              const { data } = await axios.post(
                "http://172.20.10.5:8000/users/login",
                {
                  ...credentials,
                }
              );

              localStorage.setItem("token", data.token);
            }}
          >
            Login
          </button>

          <p
            onClick={() => {
              setAuthState(authState === "login" ? "register" : "login");
            }}
          >
            Switch to {authState === "login" ? "register" : "login"}
          </p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, firstName: e.target.value });
            }}
          />

          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, lastName: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, phone: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, tunnel: e.target.value });
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                "http://172.20.10.5:8000/users/signup",
                credentials
              );

              console.log(response);
            }}
          >
            Register
          </button>

          <p
            onClick={() => {
              setAuthState(authState === "login" ? "register" : "login");
            }}
          >
            Switch to {authState === "login" ? "register" : "login"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
