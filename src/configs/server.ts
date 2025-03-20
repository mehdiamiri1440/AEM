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

// Create a Registry
const register = new promClient.Registry();

// Define a counter metric
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// Define a histogram for response time
const responseTimeHistogram = new promClient.Histogram({
  name: "http_response_time_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5], // Define time buckets
});

// Register metrics
register.registerMetric(httpRequestCounter);
register.registerMetric(responseTimeHistogram);
promClient.collectDefaultMetrics({ register });

// Middleware to track response time
app.use((req, res, next) => {
  const end = responseTimeHistogram.startTimer();
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
    end({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Sentry Error Handling Middleware
app.use(Sentry.Handlers.errorHandler());

// Setup Swagger
setupSwagger(app);

export default app;
