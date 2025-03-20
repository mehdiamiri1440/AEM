import { Router } from "express";
import Sentry from "@configs/sentry";

const router = Router();

// Test route to force an error
router.get("/error", async (req, res) => {
  try {
    throw new Error("Test Sentry error!");
  } catch (err) {
    Sentry.captureException(err); // Send error to Sentry
    res.status(500).json({ message: "Test Sentry error logged!" });
  }
});

export default router;
