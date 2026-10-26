import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "verified" | "unverified" | "primary" | "secondary" | "outline";
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    verified: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    unverified: "bg-amber-100 text-amber-800 border border-amber-200",
    primary: "bg-blue-100 text-blue-900 border border-blue-200",
    secondary: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "text-slate-800 border border-slate-300",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
