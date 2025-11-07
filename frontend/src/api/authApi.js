import api from "./axiosInstance";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (full_name, email, password, phone) => {
  const res = await api.post("/auth/register", { full_name, email, password, phone });
  return res.data;
};
