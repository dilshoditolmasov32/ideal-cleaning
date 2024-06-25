import axios from "axios";

const htpp = axios.create({
  baseURL: "https://app.olimjanov.uz/v1",
});

htpp.interceptors.request.use((config) => {
  let token = "";
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

export default htpp;