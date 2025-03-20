import request from "supertest";
import app from "@configs/server";

describe("RomanNumeral API", () => {
  test("should return correct Roman numeral", async () => {
    const response = await request(app).get("/romannumeral?query=10");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: { input: "10", output: "X" },
    });
  });

  test("should return 400 for invalid input", async () => {
    const response = await request(app).get("/romannumeral?query=0");
    expect(response.status).toBe(400);
  });

  test("should return 400 for non-numeric input", async () => {
    const response = await request(app).get("/romannumeral?query=abc");
    expect(response.status).toBe(400);
  });
});
