// src/services/levelService.js
import API from "./api";

export const getLevels = async () => {
  const { data } = await API.get("/levels");
  return data;
};
