import { apiUrl } from "../config/config.js";
import axios from "axios";
import { useUserStore } from "../store/userStore.js";
import { showToast } from "./toastHelper.js";

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleLogin = async (
  e,
  formData,
  navigate,
  setIsLoading,
  setIsError
) => {
  e.preventDefault();
  setIsLoading(true);
  setIsError(null);
  const login = formData.login.trim();
  const password = formData.password.trim();
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, {
      login,
      password,
    });
    const { accessToken } = res.data;

    if (!accessToken) {
      showToast.error("Token olinmadi. Qaytadan urinib ko'ring.");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  } catch (error) {
    const message = error?.response?.data?.message || "Xatolik yuz berdi!";
    setIsError(error);
    showToast.error(message);
  } finally {
    setIsLoading(false);
  }
};

export const fetchUserData = async (navigate, setIsLoading, setIsError) => {
  setIsLoading(true);
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setIsLoading(false);
    navigate("/login");
    return;
  }

  try {
    const res = await axios.get(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = res.data.data;
    useUserStore.getState().setUser(userData);
  } catch (error) {
    setIsError(error);
  } finally {
    setIsLoading(false);
  }
};
