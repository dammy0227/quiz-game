import API from "./api";

// Register
export const register = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login
export const login = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
