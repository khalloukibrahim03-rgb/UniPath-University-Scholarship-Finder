import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UniPath Admin — Private Research Agent & Verification Workspace",
  description: "Private administrative workspace for UniPath research agent tasks, claim-level evidence verification, and data review queue.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <div className="bg-amber-500 text-slate-950 text-center text-xs font-black py-1 px-4 uppercase tracking-widest shadow-sm">
        🔒 Private Administrative Workspace — Authorized Personnel Only
      </div>
      <div className="flex-1 bg-slate-900/50">{children}</div>
    </div>
  );
}
