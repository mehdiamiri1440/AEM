import request from "supertest";
import app from "@configs/server";

describe("RomanNumeralController", () => {
  test("should return correct Roman numeral for valid input", async () => {
    const response = await request(app).get("/romannumeral?query=10");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: { input: "10", output: "X" },
    });
  });

  test("should return 400 for invalid input (zero)", async () => {
    const response = await request(app).get("/romannumeral?query=0");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid query parameter",
    });
  });

  test("should return 400 for non-numeric input", async () => {
    const response = await request(app).get("/romannumeral?query=abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid query parameter",
    });
  });

  test("should return 400 for out-of-range input", async () => {
    const response = await request(app).get("/romannumeral?query=4000");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid query parameter",
    });
  });
});
