import { NextRequest } from "next/server";

export function isAuthorizedAdmin(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.get("x-admin-secret") || req.headers.get("authorization");

  if (!authHeader) return false;

  // If ADMIN_SECRET is set in environment, require exact match
  if (adminSecret) {
    return authHeader === adminSecret || authHeader === `Bearer ${adminSecret}`;
  }

  // Strictly in local development environment without explicit ADMIN_SECRET:
  // Reject in production if ADMIN_SECRET is not configured
  if (process.env.NODE_ENV === "production") {
    console.error("ADMIN_SECRET is not set in production environment!");
    return false;
  }

  // Local development mode fallback: requires header
  return authHeader.trim().length >= 8;
}
