import { detectSuspiciousActivity } from "@middlewares/RequestHandler";
import { Request, Response, NextFunction } from "express";

describe("RequestHandler Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { ip: "127.0.0.1" };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should allow normal requests", () => {
    detectSuspiciousActivity(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("should block IPs with excessive requests", () => {
    for (let i = 0; i < 15; i++) {
      detectSuspiciousActivity(req as Request, res as Response, next);
    }
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Too many requests detected. IP blocked.",
    });
  });
});
