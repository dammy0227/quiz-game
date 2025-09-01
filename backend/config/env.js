import dotenv from "dotenv";

// Load .env file
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "defaultsecret", // fallback if not set
};
