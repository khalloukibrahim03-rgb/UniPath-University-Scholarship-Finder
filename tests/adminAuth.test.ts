import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { isAuthorizedAdmin, isAuthorizedAdminEmail } from "@/lib/utils/adminAuth";

describe("Admin authorization", () => {
  const TEST_SECRET = "unipath-test-admin-secret-2026-with-strong-entropy";
  const originalSecret = process.env.ADMIN_SECRET;
  const originalEmail = process.env.ADMIN_EMAIL;

  beforeEach(() => {
    process.env.ADMIN_SECRET = TEST_SECRET;
    process.env.ADMIN_EMAIL = "admin@example.com";
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ADMIN_SECRET;
    else process.env.ADMIN_SECRET = originalSecret;
    if (originalEmail === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = originalEmail;
  });

  it("requires an explicitly configured admin email", () => {
    expect(isAuthorizedAdminEmail("admin@example.com")).toBe(true);
    expect(isAuthorizedAdminEmail(" ADMIN@EXAMPLE.COM ")).toBe(true);
    expect(isAuthorizedAdminEmail("other@example.com")).toBe(false);
    expect(isAuthorizedAdminEmail(null)).toBe(false);
    delete process.env.ADMIN_EMAIL;
    expect(isAuthorizedAdminEmail("admin@example.com")).toBe(false);
  });

  it("authorizes a valid configured secret", () => {
    const req = new NextRequest("http://localhost/api/admin", {
      headers: { "x-admin-secret": TEST_SECRET },
    });
    expect(isAuthorizedAdmin(req)).toBe(true);
  });

  it("supports bearer authorization", () => {
    const req = new NextRequest("http://localhost/api/admin", {
      headers: { authorization: `Bearer ${TEST_SECRET}` },
    });
    expect(isAuthorizedAdmin(req)).toBe(true);
  });

  it("rejects missing, short, or incorrect secrets", () => {
    expect(isAuthorizedAdmin(new NextRequest("http://localhost/api/admin"))).toBe(false);
    expect(isAuthorizedAdmin(new NextRequest("http://localhost/api/admin", {
      headers: { "x-admin-secret": "wrong-secret-value-that-is-long-enough-123" },
    }))).toBe(false);
    process.env.ADMIN_SECRET = "short";
    expect(isAuthorizedAdmin(new NextRequest("http://localhost/api/admin", {
      headers: { "x-admin-secret": "short" },
    }))).toBe(false);
  });

  it("rejects a mismatched optional admin email header", () => {
    const req = new NextRequest("http://localhost/api/admin", {
      headers: {
        "x-admin-secret": TEST_SECRET,
        "x-admin-email": "attacker@example.com",
      },
    });
    expect(isAuthorizedAdmin(req)).toBe(false);
  });
});
