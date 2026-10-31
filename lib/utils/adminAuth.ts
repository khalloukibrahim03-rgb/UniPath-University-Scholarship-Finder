import { NextRequest } from "next/server";

/**
 * Admin routes are protected by a server-side secret in every environment.
 * Configure ADMIN_SECRET and (optionally) ADMIN_EMAIL in the deployment environment.
 * Never accept a client-supplied passkey as a development authorization bypass.
 */
export function isAuthorizedAdminEmail(email?: string | null): boolean {
  const configuredAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!configuredAdminEmail || !email || typeof email !== "string") return false;
  return email.trim().toLowerCase() === configuredAdminEmail;
}

export function isAuthorizedAdmin(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || adminSecret.length < 32) {
    console.error("ADMIN_SECRET must be configured with at least 32 characters.");
    return false;
  }

  const authorization = req.headers.get("authorization") || "";
  const secretHeader = req.headers.get("x-admin-secret") || "";
  const providedToken = authorization.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : secretHeader.trim();

  if (!providedToken || providedToken.length !== adminSecret.length) return false;

  // Constant-time comparison avoids leaking how many leading characters matched.
  let mismatch = 0;
  for (let i = 0; i < adminSecret.length; i += 1) {
    mismatch |= adminSecret.charCodeAt(i) ^ providedToken.charCodeAt(i);
  }
  if (mismatch !== 0) return false;

  const emailHeader = req.headers.get("x-admin-email");
  if (emailHeader && !isAuthorizedAdminEmail(emailHeader)) return false;
  return true;
}
