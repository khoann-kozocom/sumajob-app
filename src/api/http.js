import axios from "axios";

export const API_URL = `${process.env.PUBLIC_API_URL}`;

const Http = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

Http.interceptors.response.use(
  (response) => {
    const result = response.data;
    return result;
  },
  (error) => {
    return error;
  }
);

export default Http;
