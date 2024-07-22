import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../core/data/remote/auth";

const useServicesAuth = () => {
  const navigate = useNavigate();

  const [googleUser, setGoogleUser] =
    useState<
      Omit<TokenResponse, "error" | "error_description" | "error_uri">
    >();

  const [profile, setProfile] = useState<any>();

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser) {
      authApi
        .googleAuth(googleUser)
        .then((data) => {
          setProfile(data);
        })
        .catch((err) => console.log(err));
    }
  }, [googleUser]);

  useEffect(() => {
    const loginOAuth = async () => {
      const data = await authApi.loginOAuth(profile);

      localStorage.setItem("token", data.token);

      navigate("/chats");
    };

    if (profile) {
      loginOAuth();
    }
  }, [profile]);

  return { googleLogin };
};

export default useServicesAuth;
