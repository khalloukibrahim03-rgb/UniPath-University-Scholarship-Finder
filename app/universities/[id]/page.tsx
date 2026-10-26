import { notFound } from "next/navigation";
import Link from "next/link";
import { DataService } from "@/lib/services/dataService";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, GraduationCap, Calendar, CheckCircle2, ArrowLeft, Bookmark } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: { id: string };
}

export default function UniversityDetailPage({ params }: PageProps) {
  const university = DataService.getUniversityById(params.id);

  if (!university) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link href="/universities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Universities</span>
      </Link>

      {/* Hero Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {university.isPublic ? "Public Higher Education Institution" : "Private Institution"}
          </Badge>
          <SourceBadge
            status={university.verificationStatus}
            verifiedAt={university.verifiedAt}
            sourceUrl={university.sourceUrl}
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-black text-blue-950">{university.name}</h1>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>
              {university.city}, {university.country}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">{university.description}</p>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-600">
            <span>National Rank: <strong>#{university.rankingNational || "N/A"}</strong></span>
            <span>Global Rank: <strong>#{university.rankingGlobal || "N/A"}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a href={university.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Official Portal</span>
              </Button>
            </a>
            <Link href="/dashboard">
              <Button size="sm" variant="primary" className="gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Track Application</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Programs & Requirements Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <span>Academic Programs & Mandatory Requirements</span>
        </h2>

        {university.featuredPrograms && university.featuredPrograms.length > 0 ? (
          university.featuredPrograms.map((program) => (
            <Card key={program.id} className="border-slate-200">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="primary">{program.degreeLevel} Degree</Badge>
                  <SourceBadge status={program.verificationStatus} verifiedAt={program.verifiedAt} sourceUrl={program.sourceUrl} />
                </div>
                <CardTitle className="text-xl font-bold text-blue-950 mt-1">{program.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <span>Language: <strong>{program.languageOfInstruction}</strong></span>
                  <span>Duration: <strong>{program.durationMonths} months</strong></span>
                  <span>Annual Tuition: <strong className="text-blue-900">{formatCurrency(program.tuitionFeeAnnual, program.currency)}</strong></span>
                  {program.applicationDeadline && (
                    <span className="flex items-center gap-1 text-amber-800 font-semibold">
                      <Calendar className="w-3.5 h-3.5" /> Deadline: {program.applicationDeadline}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Mandatory Admission Prerequisites & Documents:</h3>
                {program.requirements && program.requirements.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {program.requirements.map((req) => (
                      <div key={req.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-950 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {req.title}
                          </span>
                          <Badge variant="secondary" className="text-[10px]">{req.requirementType}</Badge>
                        </div>
                        <p className="text-xs text-slate-600 pl-5">{req.description}</p>
                        {req.acceptedQualifications && req.acceptedQualifications.length > 0 && (
                          <div className="pl-5 pt-1 text-[11px] text-slate-500">
                            Accepted Qualifications: <span className="font-medium text-slate-800">{req.acceptedQualifications.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No specific requirements listed.</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-slate-500">No programs currently published for this university.</p>
        )}
      </div>
    </div>
  );
}
