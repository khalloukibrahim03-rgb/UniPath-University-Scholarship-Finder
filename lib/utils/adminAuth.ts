import { NextRequest } from "next/server";

export const PRIMARY_ADMIN_EMAIL = "ibrahimkhallouki2@gmail.com";

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email || typeof email !== "string") return false;
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || PRIMARY_ADMIN_EMAIL).toLowerCase();
  return email.trim().toLowerCase() === configuredAdminEmail;
}

export function isAuthorizedAdmin(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.get("x-admin-secret") || req.headers.get("authorization");
  const adminEmailHeader = req.headers.get("x-admin-email");

  // Rule 1: Email whitelisting check
  if (adminEmailHeader && !isAuthorizedAdminEmail(adminEmailHeader)) {
    return false;
  }

  // Rule 2: Require authorization header
  if (!authHeader) {
    return false;
  }

  const providedToken = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "").trim() : authHeader.trim();

  // Rule 3: If ADMIN_SECRET environment variable is configured, match strictly
  if (adminSecret) {
    return providedToken === adminSecret;
  }

  // Rule 4: Production security requirement - ADMIN_SECRET must be configured
  if (process.env.NODE_ENV === "production") {
    console.error("ADMIN_SECRET environment variable is not set in production.");
    return false;
  }

  // Rule 5: Development fallback requiring a non-empty passkey header
  return providedToken.length >= 8;
}
