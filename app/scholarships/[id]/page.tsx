import { notFound } from "next/navigation";
import Link from "next/link";
import { DataService } from "@/lib/services/dataService";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, ExternalLink, ArrowLeft, CheckCircle2, Bookmark } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PageProps {
  params: { id: string };
}

export default function ScholarshipDetailPage({ params }: PageProps) {
  const scholarship = DataService.getScholarshipById(params.id);

  if (!scholarship) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link href="/scholarships" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Scholarships</span>
      </Link>

      {/* Hero Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-900 border-amber-200 text-xs font-bold">
            {scholarship.coverageType}
          </Badge>
          <SourceBadge
            status={scholarship.verificationStatus}
            verifiedAt={scholarship.verifiedAt}
            sourceUrl={scholarship.sourceUrl}
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-black text-blue-950">{scholarship.title}</h1>
          <p className="text-sm text-slate-600 font-semibold">
            Provider: <span className="text-slate-900">{scholarship.providerName}</span>
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">{scholarship.description}</p>

        {/* Breakdown Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 font-medium block">Destination Countries:</span>
            <span className="font-bold text-slate-900">{scholarship.destinationCountries.join(", ")}</span>
          </div>

          <div>
            <span className="text-slate-500 font-medium block">Annual Living Stipend:</span>
            <span className="font-bold text-emerald-700">
              {scholarship.stipendAmountAnnual ? formatCurrency(scholarship.stipendAmountAnnual, scholarship.currency) : "Covered in full"}
            </span>
          </div>

          <div>
            <span className="text-slate-500 font-medium block">Application Deadline:</span>
            <span className="font-bold text-amber-900 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5" /> {formatDate(scholarship.applicationDeadline)}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer">
            <Button size="md" variant="secondary" className="gap-2 font-bold">
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
          <Link href="/dashboard">
            <Button size="md" variant="outline" className="gap-2">
              <Bookmark className="w-4 h-4 text-blue-900" />
              <span>Save to Application Tracker</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mandatory Requirements List */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-950 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Eligibility Criteria & Mandatory Application Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scholarship.requirementsList.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{req}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
