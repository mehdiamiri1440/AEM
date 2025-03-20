import dotenv from "dotenv";
dotenv.config();
export const CONFIG = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || "localhost",
  RATE_LIMIT: parseInt(process.env.RATE_LIMIT || "100", 10), // Max requests per minute
  SENTRY_DSN: process.env.SENTRY_DSN || "", // Sentry DSN for error tracking
};
