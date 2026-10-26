import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">UniPath</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students from Morocco and broader African regions with source-verified higher education discovery, financial aid tracking, and grounded guidance.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/universities" className="hover:text-amber-400 transition-colors">
                  University Discovery
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-amber-400 transition-colors">
                  Scholarship Finder
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  Application Tracking Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Documentation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/docs/architecture.md" className="hover:text-amber-400 transition-colors">
                  Technical Architecture
                </a>
              </li>
              <li>
                <a href="/docs/ai-guidance.md" className="hover:text-amber-400 transition-colors">
                  AI Guidance Specification
                </a>
              </li>
              <li>
                <a href="/docs/security-and-privacy.md" className="hover:text-amber-400 transition-colors">
                  Security & Privacy Review
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Trust & Principles</h4>
            <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Zero hallucinated deadlines. Every requirement links directly to verified university portals.
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UniPath. Open-Source Educational Guidance Platform.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            <span>Built with care for international students</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
