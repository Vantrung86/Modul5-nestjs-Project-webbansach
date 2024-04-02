import axios from "axios";

const baseURL = "http://localhost:8000";

const tokenAxios = axios.create({
  baseURL,
});

tokenAxios.interceptors.request.use((config:any) => {
  const jwtTokent = localStorage.getItem("token");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtTokent}`,
    },
  };
});

export default tokenAxios;