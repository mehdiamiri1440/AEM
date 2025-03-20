import request from "supertest";
import app from "@configs/server";

describe("Health Check API", () => {
  test("should return application health status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "healthy");
    expect(response.body).toHaveProperty("uptime");
  });
});
