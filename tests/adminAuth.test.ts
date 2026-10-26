import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { isAuthorizedAdmin, isAuthorizedAdminEmail, PRIMARY_ADMIN_EMAIL } from "@/lib/utils/adminAuth";

describe("Admin Authorization Security Module", () => {
  const TEST_SECRET = "unipath-test-admin-secret-2026";
  const originalSecret = process.env.ADMIN_SECRET;

  beforeEach(() => {
    process.env.ADMIN_SECRET = TEST_SECRET;
  });

  afterEach(() => {
    process.env.ADMIN_SECRET = originalSecret;
  });

  it("validates primary admin email ibrahimkhallouki2@gmail.com", () => {
    expect(isAuthorizedAdminEmail(PRIMARY_ADMIN_EMAIL)).toBe(true);
    expect(isAuthorizedAdminEmail("IBRAHIMKHALLOUKI2@GMAIL.COM")).toBe(true);
    expect(isAuthorizedAdminEmail(" ibrahimkhallouki2@gmail.com ")).toBe(true);
  });

  it("strictly rejects unauthorized emails", () => {
    expect(isAuthorizedAdminEmail("unauthorized@example.com")).toBe(false);
    expect(isAuthorizedAdminEmail("attacker@gmail.com")).toBe(false);
    expect(isAuthorizedAdminEmail("ibrahimkhallouki2@gmail.com.fake")).toBe(false);
    expect(isAuthorizedAdminEmail("")).toBe(false);
    expect(isAuthorizedAdminEmail(null)).toBe(false);
    expect(isAuthorizedAdminEmail(undefined)).toBe(false);
  });

  it("authorizes requests with whitelisted admin email header AND valid admin secret", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: {
        "x-admin-email": "ibrahimkhallouki2@gmail.com",
        "x-admin-secret": TEST_SECRET,
      },
    });
    expect(isAuthorizedAdmin(req)).toBe(true);
  });

  it("authorizes requests with Bearer secret token", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: { authorization: `Bearer ${TEST_SECRET}` },
    });
    expect(isAuthorizedAdmin(req)).toBe(true);
  });

  it("CRITICAL SECURITY: rejects unauthenticated requests even if spoofing x-admin-email header without valid secret", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: { "x-admin-email": "ibrahimkhallouki2@gmail.com" },
    });
    expect(isAuthorizedAdmin(req)).toBe(false);
  });

  it("rejects requests with unauthorized email even if valid secret is supplied", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: {
        "x-admin-email": "hacker@domain.com",
        "x-admin-secret": TEST_SECRET,
      },
    });
    expect(isAuthorizedAdmin(req)).toBe(false);
  });

  it("rejects completely unauthenticated requests", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks");
    expect(isAuthorizedAdmin(req)).toBe(false);
  });
});
