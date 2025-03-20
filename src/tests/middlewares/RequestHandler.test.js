"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("@middlewares/RequestHandler");
describe("RequestHandler Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { ip: "127.0.0.1" };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    test("should allow normal requests", () => {
        (0, RequestHandler_1.detectSuspiciousActivity)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    test("should block IPs with excessive requests", () => {
        for (let i = 0; i < 15; i++) {
            (0, RequestHandler_1.detectSuspiciousActivity)(req, res, next);
        }
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Too many requests detected. IP blocked.",
        });
    });
});
