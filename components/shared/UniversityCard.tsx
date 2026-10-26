import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { MapPin, GraduationCap, Building2, ChevronRight } from "lucide-react";
import { University } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface UniversityCardProps {
  university: University;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  const primaryProgram = university.featuredPrograms?.[0];

  return (
    <Card className="flex flex-col justify-between h-full hover:border-blue-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {university.isPublic ? "Public University" : "Private University"}
          </Badge>
          <SourceBadge
            status={university.verificationStatus}
            verifiedAt={university.verifiedAt}
            sourceUrl={university.sourceUrl}
          />
        </div>
        <CardTitle className="text-xl text-blue-950 font-bold">
          <Link href={`/universities/${university.id}`} className="hover:underline">
            {university.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-slate-600 mt-1">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            {university.city}, {university.country}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <p className="text-sm text-slate-700 line-clamp-3">{university.description}</p>

        {primaryProgram && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 space-y-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-900" /> Featured Program:
            </div>
            <p className="text-sm font-semibold text-slate-900 line-clamp-1">{primaryProgram.title}</p>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>Tuition: {formatCurrency(primaryProgram.tuitionFeeAnnual, primaryProgram.currency)}/yr</span>
              <span>Degree: {primaryProgram.degreeLevel}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Global Rank: #{university.rankingGlobal || "N/A"}
        </div>
        <Link href={`/universities/${university.id}`}>
          <Button size="sm" variant="primary" className="flex items-center gap-1">
            <span>Explore Programs</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
