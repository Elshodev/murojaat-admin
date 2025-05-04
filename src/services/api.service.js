import axios from "axios";
import { apiUrl } from "../config/config.js";

const instance = axios.create({
  baseURL: apiUrl,
});

// Tokenni avtomatik qo‘shish
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
