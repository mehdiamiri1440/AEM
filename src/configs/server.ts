// src/config/server.ts
import express from "express";
import cors from "cors";
import promClient from "prom-client";
import Sentry from "@configs/sentry";
import {
  requestLogger,
  detectSuspiciousActivity,
  rateLimiter,
} from "@middlewares/RequestHandler";
import romanNumeralRoutes from "@routes/RomanNumeralRoutes";
import { setupSwagger } from "@configs/swagger";
import debugRoutes from "@routes/debugRoutes";

const app = express();

// Sentry Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins (change to specific domain in production)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use("/debug", debugRoutes);
app.use(requestLogger);
app.use(detectSuspiciousActivity);
app.use(rateLimiter);

// Root Route - API Info
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Roman Numeral API!",
    usage: {
      convert: "/romannumeral?query={number}",
      health: "/health",
      metrics: "/metrics",
    },
  });
});

// API Route
app.use("/romannumeral", romanNumeralRoutes);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", uptime: process.uptime() });
});

// Prometheus Metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Sentry Error Handling Middleware
app.use(Sentry.Handlers.errorHandler());

// Setup Swagger
setupSwagger(app);

export default app;
