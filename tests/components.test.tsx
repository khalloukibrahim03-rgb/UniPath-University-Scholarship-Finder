import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { Badge } from "@/components/ui/badge";

describe("SourceBadge Component", () => {
  it("renders verified status badge cleanly", () => {
    render(<SourceBadge status="verified" verifiedAt="2024-10-15" />);
    expect(screen.getByText("Official Source Verified")).toBeInTheDocument();
    expect(screen.getByText("(2024-10-15)")).toBeInTheDocument();
  });

  it("renders pending verification badge", () => {
    render(<SourceBadge status="unverified" />);
    expect(screen.getByText("Pending Verification")).toBeInTheDocument();
  });
});

describe("Badge Component", () => {
  it("renders children text correctly", () => {
    render(<Badge variant="verified">Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });
});
