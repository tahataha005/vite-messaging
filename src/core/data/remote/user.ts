import { request } from "../../tools/request";

export const userApi = {
  getUser: async () => {
    try {
      const { data } = await request({
        route: "/users",
        method: "GET",
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
