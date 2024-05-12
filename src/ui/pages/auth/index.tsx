import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import logo from "../../../../public/logo.svg";
import { AuthService } from "../../common/AuthService";
import {
  CodeResponse,
  GoogleLogin,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../core/data/local/context/authContext";

const Auth = () => {
  const navigate = useNavigate();
  const { loadAuthentication, authenticating } = useAuthContext();
  const [authState, setAuthState] = useState("login");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    tunnel: "",
  });

  useGSAP(() => {
    const tl = gsap.timeline();

    if (authState === "register") {
      tl.to(".login-box", {
        duration: 1,
        y: 350,
        borderRadius: "50%",
        minWidth: "200%",
      });
    } else {
      tl.to(".login-box", {
        duration: 1,
        y: 60,
        borderRadius: "8px",
        ease: "power4.out",
        minWidth: "100%",
      });
    }
  }, [authState]);

  const [user, setUser] =
    useState<
      Omit<TokenResponse, "error" | "error_description" | "error_uri">
    >();
  const [profile, setProfile] = useState<any>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as any),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    const login = async () => {
      const repsonse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL!}/users/oauth`,
        {
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          aut: "google",
        }
      );

      console.log(repsonse);

      localStorage.setItem("token", repsonse.data.token);

      navigate("/chats");
    };

    if (profile) {
      login();
    }
  }, [profile]);

  return (
    <div className="center white-bg page auth-page">
      <div className="flex row white-bg auth-container">
        <div className="flex column center welcome-box">
          <img src={logo} alt="logo" />
          <h1 className="primary-text">Welcome HyChat</h1>
          <p className="grey-text">The best place to chat with your friends</p>

          <div className="divider"></div>

          <h3 className="grey-text">Sign in with</h3>

          <div className="flex row center full-width gap-30">
            <AuthService type="google" onClick={login} />
            <AuthService type="facebook" />
            <AuthService type="github" />
          </div>
        </div>
        <div className="flex column primary-bg signup-box auth-box">
          <h2
            className="white-text"
            onClick={() => {
              setAuthState("register");
            }}
          >
            Sign Up
          </h2>
          <input
            type="email"
            placeholder="name@example.com"
            className="input"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <div className="flex row gap-15 full-width">
            <input
              type="text"
              placeholder="First Name"
              className="input"
              onChange={(e) => {
                setCredentials({ ...credentials, firstName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              onChange={(e) => {
                setCredentials({ ...credentials, lastName: e.target.value });
              }}
            />
          </div>
          <input
            type="text"
            placeholder="+01 123 456 7890"
            className="input"
            onChange={(e) => {
              setCredentials({ ...credentials, phone: e.target.value });
            }}
          />

          <button
            className="button white-bg full-width bold"
            onClick={async () => {
              authenticating();

              const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL!}/users/signup`,
                credentials
              );

              loadAuthentication(response.data.token);

              console.log(response);
            }}
          >
            Register
          </button>

          <div className="flex column full-width white-bg login-box">
            <div className="flex column login-content">
              <h2
                className="white"
                onClick={() => {
                  setAuthState("login");
                }}
              >
                Login
              </h2>
              <input
                type="text"
                placeholder="Email"
                className="input"
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
              <p className="primary-text">Forgot Password?</p>
              <button
                className="primary-bg full-width white-text bold"
                onClick={async () => {
                  authenticating();

                  const { data } = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL!}/users/login`,
                    {
                      ...credentials,
                    }
                  );

                  localStorage.setItem("token", data.token);

                  loadAuthentication(data.user);

                  navigate("/chats");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
