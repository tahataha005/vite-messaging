import axios from "axios";
import { request } from "../../tools/request";

export const authApi = {
  googleAuth: async (user) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  loginOAuth: async (profile) => {
    try {
      const { data } = await request({
        method: "POST",
        route: "auth/oauth",
        data: {
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          aut: "google",
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
