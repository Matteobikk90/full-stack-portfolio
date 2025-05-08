import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateBody } from "@/middleware/validate";
import { createUserSchema } from "@/validation/user.schema";

describe("validateBody middleware", () => {
  const next = vi.fn();
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls next if body is valid", () => {
    const req = {
      body: { name: "Matteo", email: "matteo@example.com" },
    } as any;

    validateBody(createUserSchema)(req, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("returns 400 if body is invalid", () => {
    const req = {
      body: { name: "", email: "invalid-email" },
    } as any;

    validateBody(createUserSchema)(req, res as any, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.any(Object),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
