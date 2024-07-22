import { request } from "../../tools/request";

export const userApi = {
  getUser: async () => {
    try {
      const { data } = await request({
        route: "/auth",
        method: "GET",
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
  search: async (query) => {
    try {
      const { data } = await request({
        method: "POST",
        route: `/users/filter`,
        data: query,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
