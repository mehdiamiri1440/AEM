import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@enums/HttpStatus";
import rateLimit from "express-rate-limit";
import { CONFIG } from "@configs/dotenvConfig";

const blockedIPs = new Set<string>(); // Store blocked IPs
const requestCounts = new Map<string, number>();
const MAX_REQUESTS = 10;
const TIME_WINDOW = 60000; // 60 seconds

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`
  );
  next();
}

export function detectSuspiciousActivity(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ip = req.ip || "";
  if (blockedIPs.has(ip)) {
    res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      message: "Access blocked due to suspicious activity",
    });
    return;
  }

  const currentTime = Date.now();
  const previousCount = requestCounts.get(ip) || 0;
  requestCounts.set(ip, previousCount + 1);

  setTimeout(() => requestCounts.delete(ip), TIME_WINDOW);

  if (previousCount > MAX_REQUESTS) {
    res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      message: "Too many requests detected. IP blocked.",
    });
    return;
  }
  next();
}

export const rateLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: CONFIG.RATE_LIMIT,
  message: "Too many requests. Please try again later.",
});
