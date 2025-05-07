import { describe, expect, it } from "vitest";
import { createUserSchema, idParamSchema } from "@/validation/user.schema";

describe("createUserSchema", () => {
  it("passes with valid input", () => {
    const result = createUserSchema.safeParse({
      name: "Matteo",
      email: "matteo@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("fails with empty name", () => {
    const result = createUserSchema.safeParse({
      name: "",
      email: "matteo@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("fails with invalid email", () => {
    const result = createUserSchema.safeParse({
      name: "Matteo",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});

describe("idParamSchema", () => {
  it("passes with valid UUID", () => {
    const result = idParamSchema.safeParse({
      id: "9c3d4e59-f18f-4a67-b4f1-2c828e9d3e36",
    });
    expect(result.success).toBe(true);
  });

  it("fails with invalid UUID", () => {
    const result = idParamSchema.safeParse({ id: "not-a-uuid" });
    expect(result.success).toBe(false);
  });
});
