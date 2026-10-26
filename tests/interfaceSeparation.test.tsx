import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";
import { NextRequest } from "next/server";
import { DataService } from "@/lib/services/dataService";

describe("Public / Private Interface Isolation", () => {
  it("verifies public Navbar contains zero administrative links or controls", () => {
    render(<Navbar />);

    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/review queue/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/research agent/i)).not.toBeInTheDocument();
    expect(screen.getByText("Universities")).toBeInTheDocument();
    expect(screen.getByText("Scholarships")).toBeInTheDocument();
  });

  it("verifies public Footer contains zero administrative controls", () => {
    render(<Footer />);

    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/proposed records/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Platform" })).toBeInTheDocument();
  });

  it("enforces server-side authorization check for administrative API routes", () => {
    const unauthReq = new NextRequest("http://localhost:3000/api/admin/research-tasks");
    expect(isAuthorizedAdmin(unauthReq)).toBe(false);

    const authReq = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: { "x-admin-secret": "unipath-secure-admin-key-2026" },
    });
    expect(isAuthorizedAdmin(authReq)).toBe(true);
  });

  it("verifies public DataService directory contains only published/approved records", () => {
    const unis = DataService.getUniversities();
    expect(unis.length).toBeGreaterThan(0);

    // Verify all returned records have verified status and are published
    unis.forEach((u) => {
      expect(u.verificationStatus).toBe("verified");
      expect(u.id).not.toContain("pending");
    });
  });
});
