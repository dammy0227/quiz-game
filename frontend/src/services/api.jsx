// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://quiz-game-e4ln.onrender.com/api", // ✅ use your deployed backend
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
