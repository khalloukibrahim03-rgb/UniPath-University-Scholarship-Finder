import Link from "next/link";
import { AIGuidanceBox } from "@/components/shared/AIGuidanceBox";
import { DataService } from "@/lib/services/dataService";
import {
  ArrowRight, ArrowUpRight, Award, BookOpen, CheckCircle2, Compass,
  GraduationCap, Globe2, ShieldCheck, Sparkles, WalletCards,
} from "lucide-react";

const destinations = [
  { name: "France", note: "Universities & grandes écoles", mark: "FR", tone: "bg-blue-50 text-blue-800" },
  { name: "Germany", note: "Research-led study options", mark: "DE", tone: "bg-amber-50 text-amber-800" },
  { name: "Morocco", note: "Local pathways & financial aid", mark: "MA", tone: "bg-emerald-50 text-emerald-800" },
  { name: "Worldwide", note: "Explore beyond borders", mark: "✦", tone: "bg-violet-50 text-violet-800" },
];

const steps = [
  { number: "01", title: "Explore your options", body: "Compare universities, programs, destinations, and funding opportunities." },
  { number: "02", title: "Check the details", body: "Use official provider links to confirm requirements, eligibility, and deadlines." },
  { number: "03", title: "Plan your next move", body: "Organise your shortlist and keep your application tasks in one place." },
];

export default function HomePage() {
  const universities = DataService.getUniversities().slice(0, 3);
  const scholarships = DataService.getScholarships().slice(0, 3);

  return (
    <div className="overflow-hidden bg-[#f8f9f7]">
      <section className="relative isolate bg-[#102b35] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full border border-white/10" />
          <div className="absolute -right-20 -top-28 h-[26rem] w-[26rem] rounded-full border border-white/10" />
          <div className="absolute right-[12%] top-24 h-72 w-72 rounded-full bg-[#c7e8a5]/10 blur-3xl" />
          <div className="absolute -left-40 bottom-[-16rem] h-[32rem] w-[32rem] rounded-full bg-[#2d6971]/30 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-[#d8edc2]">
              <Sparkles className="h-4 w-4" />
              YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]">
              Your ambition.
              <span className="mt-2 block text-[#c7e8a5]">A world of possibilities.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Find a university that fits your goals, discover funding opportunities, and move forward with a clearer plan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/universities" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c7e8a5] px-7 py-4 text-sm font-bold text-[#17313a] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#d5f0b9]">
                Explore universities <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/scholarships" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                Find scholarships <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#c7e8a5]" /> Source-first guidance</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-[#c7e8a5]" /> Global study options</span>
              <span className="inline-flex items-center gap-2"><WalletCards className="h-4 w-4 text-[#c7e8a5]" /> Funding discovery</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] border border-white/10" />
            <div className="relative rounded-[1.7rem] border border-white/15 bg-[#173943]/90 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c7e8a5]">The UniPath guide</p>
                  <h2 className="mt-2 text-xl font-semibold">Where would you like to go?</h2>
                </div>
                <div className="rounded-2xl bg-[#c7e8a5]/10 p-3 text-[#c7e8a5]"><Compass className="h-6 w-6" /></div>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {destinations.map((item) => (
                  <Link key={item.name} href={item.name === "Worldwide" ? "/universities" : `/universities?country=${encodeURIComponent(item.name)}`} className="group rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition hover:border-[#c7e8a5]/50 hover:bg-white/10">
                    <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-xs font-black ${item.tone}`}>{item.mark}</span>
                    <span className="mt-4 block text-sm font-semibold text-white">{item.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.note}</span>
                    <ArrowUpRight className="mt-3 h-4 w-4 text-[#c7e8a5] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#c7e8a5]/10 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c7e8a5]" />
                <p className="text-xs leading-5 text-slate-300">Always verify admission rules and funding deadlines with the official institution or scholarship provider before applying.</p>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/10 bg-[#244b52] px-5 py-4 shadow-xl sm:block">
              <div className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-[#c7e8a5]" /> A clearer path forward</div>
              <p className="mt-1 text-xs text-slate-300">Research. Compare. Prepare.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#52766d]">A better way to plan</p>
            <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-[#17313a] sm:text-4xl">Big decisions deserve a clear starting point.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">Studying abroad can feel complicated. UniPath brings discovery, funding research, and application planning into one simple experience—so you can focus on making the right next move.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-3xl border border-[#e4e9e3] bg-white p-7 shadow-sm shadow-slate-900/[0.025]">
              <span className="text-xs font-bold tracking-[0.18em] text-[#76937e]">{step.number}</span>
              <h3 className="mt-7 text-lg font-semibold text-[#17313a]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e6ebe5] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#52766d]">Start exploring</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#17313a]">University pathways</h2><p className="mt-2 text-sm text-slate-500">Browse the current catalogue and follow official links for the latest details.</p></div>
            <Link href="/universities" className="inline-flex items-center gap-2 text-sm font-semibold text-[#315f56] hover:text-[#17313a]">All universities <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">{universities.map((university) => <div key={university.id}><div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-amber-700"><BookOpen className="h-3.5 w-3.5" /> Catalogue preview</div><div className="h-full"><div className="h-full"><Link href={`/universities/${university.id}`} className="block h-full"><div className="h-full rounded-2xl border border-slate-200 bg-[#fbfcfa] p-5 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><span className="rounded-full bg-[#eaf1e8] px-3 py-1 text-xs font-semibold text-[#315f56]">{university.country}</span><ArrowUpRight className="h-4 w-4 text-slate-400" /></div><h3 className="mt-5 text-lg font-semibold text-[#17313a]">{university.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{university.city} · {university.programsCount ?? 0} listed programs</p><p className="mt-5 text-xs font-semibold text-[#52766d]">View institution <span aria-hidden="true">→</span></p></div></Link></div></div></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#52766d]">Make it possible</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#17313a]">Funding opportunities</h2><p className="mt-2 text-sm text-slate-500">Explore listings, then confirm current availability with each provider.</p></div>
          <Link href="/scholarships" className="inline-flex items-center gap-2 text-sm font-semibold text-[#315f56] hover:text-[#17313a]">All scholarships <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">{scholarships.map((scholarship) => <div key={scholarship.id} className="rounded-2xl border border-[#e4e9e3] bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#52766d]"><Award className="h-4 w-4" /> Funding listing</div><h3 className="mt-4 text-lg font-semibold text-[#17313a]">{scholarship.title}</h3><p className="mt-2 text-sm text-slate-500">{scholarship.providerName}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="rounded-full bg-[#eef3ed] px-3 py-1 text-xs font-semibold text-[#315f56]">{scholarship.coverageType}</span><Link href={`/scholarships/${scholarship.id}`} className="text-xs font-semibold text-[#315f56] hover:underline">Details <ArrowUpRight className="inline h-3 w-3" /></Link></div></div>)}</div>
      </section>

      <section className="border-t border-[#e6ebe5] bg-[#f0f4ef] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#52766d]">Ask before you apply</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#17313a]">Get a grounded starting point.</h2><p className="mt-3 text-sm leading-7 text-slate-600">Ask about your study plans. UniPath will show catalogue matches where available and point you back to official sources for confirmation.</p></div>
          <AIGuidanceBox />
        </div>
      </section>
      <section className="bg-[#102b35] px-5 py-14 text-center text-white sm:px-8">
        <GraduationCap className="mx-auto h-8 w-8 text-[#c7e8a5]" />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Your next step can start today.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Build your shortlist, explore funding, and turn a big ambition into a practical plan.</p>
        <Link href="/dashboard" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c7e8a5] px-6 py-3 text-sm font-bold text-[#17313a] transition hover:bg-[#d5f0b9]">Open my tracker <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
    </div>
  );
}
