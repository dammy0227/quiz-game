// src/services/userService.js
import API from "./api";

export const getProfile = async () => {
  const { data } = await API.get("/user/profile");
  return data;
};

export const getHistory = async () => {
  const { data } = await API.get("/user/history");
  return data;
};
