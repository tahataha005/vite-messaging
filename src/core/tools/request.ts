import axios from "axios";

type RequestParams = {
  route: string;
  method: RequestMethod;
  data?: any;
  requiresAuth?: boolean;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL as string;
axios.defaults.headers["Content-Type"] = "application/json";

export const request = async ({
  route,
  method,
  data,
  requiresAuth = true,
}: RequestParams) => {
  try {
    const token = localStorage.getItem("token");

    if (requiresAuth) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.request({
      url: route,
      method,
      data,
    });

    return response;
  } catch (error) {
    throw {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
};
