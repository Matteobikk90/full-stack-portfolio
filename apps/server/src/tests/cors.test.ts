import request from "supertest";
import app from "@/app";

describe("CORS headers", () => {
  it("should allow Vite dev origin", async () => {
    const res = await request(app)
      .get("/")
      .set("Origin", "http://localhost:5173");

    expect(res.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173"
    );
  });

  it("should NOT allow unknown origin", async () => {
    const res = await request(app).get("/").set("Origin", "http://unknown.com");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
