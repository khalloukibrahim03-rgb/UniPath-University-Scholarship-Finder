import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => (
  <footer className="mt-0 border-t border-white/10 bg-[#102b35] text-slate-300">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1.2fr]">
        <div className="max-w-xs">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c7e8a5] text-[#17313a]"><Compass className="h-5 w-5" /></span>
            <span className="text-xl font-bold tracking-tight text-white">UniPath</span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-slate-400">Helping students explore study destinations, discover funding options, and plan their next academic step with clearer information.</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c7e8a5]">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/universities" className="transition hover:text-white">Universities</Link></li>
            <li><Link href="/scholarships" className="transition hover:text-white">Scholarships</Link></li>
            <li><Link href="/dashboard" className="transition hover:text-white">Application tracker</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c7e8a5]">Project</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="https://github.com/khalloukibrahim03-rgb/UniPath-University-Scholarship-Finder" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">Open source on GitHub <ArrowUpRight className="h-3.5 w-3.5" /></a></li>
            <li><Link href="/universities" className="transition hover:text-white">Browse the catalogue</Link></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck className="h-5 w-5 text-[#c7e8a5]" /> A note about accuracy</div>
          <p className="mt-3 text-xs leading-6 text-slate-400">Catalogue entries are examples until confirmed. Always use official university and scholarship provider websites for current requirements and deadlines.</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} UniPath. Open-source educational discovery.</p>
        <p className="inline-flex items-center gap-1.5">Built with care for students <Heart className="h-3.5 w-3.5 fill-current text-rose-400" /></p>
      </div>
    </div>
  </footer>
);
