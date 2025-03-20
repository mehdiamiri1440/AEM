import express from "express";
import cors from "cors";
import promClient from "prom-client";
import * as Sentry from "@sentry/node";
import {
  requestLogger,
  detectSuspiciousActivity,
  rateLimiter,
} from "@middlewares/RequestHandler";
import romanNumeralRoutes from "@routes/RomanNumeralRoutes";

const app = express();

// Sentry Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Enable CORS
app.use(cors());

// Middleware
app.use(requestLogger);
app.use(detectSuspiciousActivity);
app.use(rateLimiter);

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

export default app;
