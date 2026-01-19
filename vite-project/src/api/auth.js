import { api } from "./axios";

export const loginRequest = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerRequest = async (userData) => {
  const res = await api.post('/auth/register', userData); 
  return res.data;
};