import htpp from "./config";

const auth = {
  sign_in: (data) => htpp.post("/auth/login", data),
  sign_up: (data) => htpp.post("/auth/register", data),
  verify: (data) => htpp.post("/auth/verify", data),
  forgot_password: (data) => htpp.post("/auth/forgot-password", data),
  verify_forgot_password: (data) =>
    htpp.post("/auth/verify-forgot-password", data),
};

export default auth;
