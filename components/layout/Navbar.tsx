"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GraduationCap, Award, LayoutDashboard, Sparkles, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Universities", href: "/universities", icon: GraduationCap },
    { label: "Scholarships", href: "/scholarships", icon: Award },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-blue-900 text-amber-400 rounded-lg shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-blue-950">UniPath</span>
            <span className="block text-[10px] font-semibold text-amber-600 tracking-wide uppercase -mt-1">
              Admissions & Scholarship Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive ? "text-blue-900 font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-500" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full bg-slate-50">
            <Globe className="w-3.5 h-3.5 text-blue-900" />
            <span className="font-semibold text-slate-800">EN</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">FR</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">AR</span>
          </div>
          <Link href="/dashboard">
            <Button size="sm" variant="primary">
              My Tracker
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-slate-700 hover:bg-slate-100 text-sm font-medium"
              >
                <Icon className="w-5 h-5 text-blue-900" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
