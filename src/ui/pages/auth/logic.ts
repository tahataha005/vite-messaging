import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../core/data/local/context/authContext";
import { ChangeEvent, useEffect, useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import gsap from "gsap";

const useAuthLogic = () => {
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
      tl.fromTo(
        ".login-box",
        {
          y: 60,
        },
        {
          duration: 1,
          y: 350,
          borderRadius: "50%",
          minWidth: "200%",
        }
      );
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

  const login = async () => {
    authenticating();

    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL!}/auth/login`,
      {
        ...credentials,
      }
    );

    localStorage.setItem("token", data.token);

    loadAuthentication(data.user);

    navigate("/chats");
  };

  const register = async () => {
    authenticating();

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL!}/auth/signup`,
      credentials
    );

    loadAuthentication(response.data.token);
  };

  const handleCredentialsChange = (
    key: keyof typeof credentials,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return {
    handleCredentialsChange,
    login,
    register,
    setAuthState,
  };
};

export default useAuthLogic;
