import API from "./api";


export const register = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};


export const login = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};


export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
