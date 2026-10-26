import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { Award, Calendar, Globe, ChevronRight } from "lucide-react";
import { Scholarship } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
    <Card className="flex flex-col justify-between h-full hover:border-amber-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-900 border-amber-200">
            {scholarship.coverageType}
          </Badge>
          <SourceBadge
            status={scholarship.verificationStatus}
            verifiedAt={scholarship.verifiedAt}
            sourceUrl={scholarship.sourceUrl}
          />
        </div>
        <CardTitle className="text-xl text-blue-950 font-bold">
          <Link href={`/scholarships/${scholarship.id}`} className="hover:underline">
            {scholarship.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-slate-600 mt-1">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Provider: {scholarship.providerName}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <p className="text-sm text-slate-700 line-clamp-3">{scholarship.description}</p>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-700">
            <span className="font-medium flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-800" /> Destination:
            </span>
            <span className="font-semibold text-slate-900">
              {scholarship.destinationCountries.join(", ")}
            </span>
          </div>

          {scholarship.stipendAmountAnnual && scholarship.stipendAmountAnnual > 0 && (
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="font-medium">Annual Stipend:</span>
              <span className="font-semibold text-emerald-700">
                {formatCurrency(scholarship.stipendAmountAnnual, scholarship.currency)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-700">
            <span className="font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700" /> Deadline:
            </span>
            <span className="font-semibold text-amber-900">
              {formatDate(scholarship.applicationDeadline)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Target: {scholarship.targetCountries.slice(0, 2).join(", ")}
        </div>
        <Link href={`/scholarships/${scholarship.id}`}>
          <Button size="sm" variant="secondary" className="flex items-center gap-1">
            <span>View Coverage</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
