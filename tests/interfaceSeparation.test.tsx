import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";
import { NextRequest } from "next/server";
import { DataService } from "@/lib/services/dataService";

describe("Public / private interface isolation", () => {
  it("keeps administrative controls out of public navigation", () => {
    render(<Navbar />);
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/review queue/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/research agent/i)).not.toBeInTheDocument();
    expect(screen.getByText("Universities")).toBeInTheDocument();
    expect(screen.getByText("Scholarships")).toBeInTheDocument();
  });

  it("keeps administrative controls out of the public footer", () => {
    render(<Footer />);
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/proposed records/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Explore" })).toBeInTheDocument();
  });

  it("requires a configured server-side secret for administrative API routes", () => {
    const originalSecret = process.env.ADMIN_SECRET;
    process.env.ADMIN_SECRET = "unipath-secure-admin-key-2026-with-strong-entropy";
    try {
      expect(isAuthorizedAdmin(new NextRequest("http://localhost:3000/api/admin/research-tasks"))).toBe(false);
      const authReq = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
        headers: { "x-admin-secret": process.env.ADMIN_SECRET },
      });
      expect(isAuthorizedAdmin(authReq)).toBe(true);
    } finally {
      if (originalSecret === undefined) delete process.env.ADMIN_SECRET;
      else process.env.ADMIN_SECRET = originalSecret;
    }
  });

  it("labels bundled public directory entries as unverified demo data", () => {
    const universities = DataService.getUniversities();
    expect(universities.length).toBeGreaterThan(0);
    universities.forEach((university) => {
      expect(university.verificationStatus).toBe("unverified");
      expect(university.name).toContain("[Demo]");
      expect(university.id).not.toContain("pending");
    });
  });
});
