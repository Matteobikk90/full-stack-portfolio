import request from "supertest";
import app from "@/app";

describe("Global error handler", () => {
  it("should catch unexpected errors and return 500", async () => {
    const res = await request(app).get("/error-test");

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Internal test error");
  });
});
