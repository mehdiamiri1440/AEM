import * as Sentry from "@sentry/node";
import { CONFIG } from "@configs/dotenvConfig";

// Initialize Sentry
Sentry.init({
  dsn: CONFIG.SENTRY_DSN, // Load DSN from .env
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }), // Capture outgoing HTTP requests
  ],
});

export default Sentry;
