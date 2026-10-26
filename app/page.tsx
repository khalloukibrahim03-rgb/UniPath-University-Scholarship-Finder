import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/shared/UniversityCard";
import { ScholarshipCard } from "@/components/shared/ScholarshipCard";
import { AIGuidanceBox } from "@/components/shared/AIGuidanceBox";
import { DataService } from "@/lib/services/dataService";
import { Compass, GraduationCap, Award, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const featuredUniversities = DataService.getUniversities().slice(0, 3);
  const featuredScholarships = DataService.getScholarships().slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/80 border border-blue-700 text-amber-300 text-xs font-semibold backdrop-blur">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Source-Verified Educational Discovery Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Clear Path to Your Dream <br className="hidden sm:inline" />
            <span className="text-amber-400">University & Scholarship</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            UniPath helps students from Morocco, Africa, and globally discover matched degree programs, calculate net costs, track application deadlines, and receive grounded guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/universities">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 text-slate-950 font-bold">
                <GraduationCap className="w-5 h-5 text-blue-950" />
                <span>Discover Universities</span>
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-white/10 border-slate-700 text-white hover:bg-white/20">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Find Scholarships</span>
              </Button>
            </Link>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left max-w-4xl mx-auto border-t border-blue-800/60 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Hallucinated Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Moroccan Bac & Licence Mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-Ride & Stipend Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Free & Open Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Grounded AI Guidance Widget */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-blue-950 flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-500" />
              <span>Ask the Grounded Admissions Counselor</span>
            </h2>
          </div>
          <AIGuidanceBox />
        </section>

        {/* Featured Universities */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-blue-950">Verified Universities & Degree Programs</h2>
              <p className="text-sm text-slate-600">Official requirements, tuition fees, and admission open cycles.</p>
            </div>
            <Link href="/universities" className="text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredUniversities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        </section>

        {/* Featured Scholarships */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-blue-950">Featured Full-Ride & Financial Aid Grants</h2>
              <p className="text-sm text-slate-600">Verified funding opportunities for African & international students.</p>
            </div>
            <Link href="/scholarships" className="text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredScholarships.map((sch) => (
              <ScholarshipCard key={sch.id} scholarship={sch} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
