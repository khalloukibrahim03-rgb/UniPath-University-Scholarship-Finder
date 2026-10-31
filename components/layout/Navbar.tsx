"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight, Award, Compass, GraduationCap, LayoutDashboard, Menu, X,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { label: "Universities", href: "/universities", icon: GraduationCap },
    { label: "Scholarships", href: "/scholarships", icon: Award },
    { label: "My tracker", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7ece7] bg-[#fbfcfa]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173943] text-[#c7e8a5] shadow-sm transition group-hover:rotate-[-6deg]">
            <Compass className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-[1.35rem] font-bold leading-none tracking-[-0.04em] text-[#17313a]">UniPath</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.17em] text-[#6c8178]">Find your way forward</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition ${active ? "bg-[#eaf1e8] text-[#244f47]" : "text-slate-600 hover:bg-slate-100 hover:text-[#17313a]"}`}>
                <Icon className="h-4 w-4" />{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/universities" className="inline-flex items-center gap-2 rounded-full bg-[#173943] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#244f59]">
            Start exploring <ArrowUpRight className="h-4 w-4 text-[#c7e8a5]" />
          </Link>
        </div>

        <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl border border-slate-200 p-2.5 text-[#17313a] md:hidden">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-[#e7ece7] bg-[#fbfcfa] px-5 py-4 shadow-lg md:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${active ? "bg-[#eaf1e8] text-[#244f47]" : "text-slate-700 hover:bg-slate-100"}`}><Icon className="h-5 w-5" />{item.label}</Link>;
            })}
            <Link href="/universities" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#173943] px-4 py-3 text-sm font-bold text-white">Start exploring <ArrowUpRight className="h-4 w-4 text-[#c7e8a5]" /></Link>
          </div>
        </nav>
      )}
    </header>
  );
};
