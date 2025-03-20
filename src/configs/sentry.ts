import * as Sentry from "@sentry/node";
import { CONFIG } from "./dotenvConfig";
Sentry.init({
  dsn: CONFIG.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
export default Sentry;
