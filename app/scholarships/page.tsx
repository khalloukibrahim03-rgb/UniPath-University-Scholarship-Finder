"use client";

import React, { useState } from "react";
import { ScholarshipCard } from "@/components/shared/ScholarshipCard";
import { DataService } from "@/lib/services/dataService";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Award, Search, Filter } from "lucide-react";

export default function ScholarshipsPage() {
  const [query, setQuery] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("All");
  const [coverageType, setCoverageType] = useState("All");

  const availableCountries = DataService.getAvailableCountries();

  const scholarships = DataService.getScholarships({
    query,
    destinationCountry,
    coverageType,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Scholarship & Financial Aid Database</span>
        </div>
        <h1 className="text-3xl font-black text-blue-950">Find Verified Scholarships & Grants</h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Search fully funded scholarships, tuition waivers, and monthly living stipends available to international students from Morocco and Africa.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholarship name, provider..."
            className="pl-9"
          />
        </div>

        {/* Destination Country Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <Select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
          >
            <option value="All">All Destination Countries</option>
            {availableCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        {/* Coverage Type Filter */}
        <div>
          <Select
            value={coverageType}
            onChange={(e) => setCoverageType(e.target.value)}
          >
            <option value="All">All Coverage Extents</option>
            <option value="Full Ride">Full Ride (Tuition + Stipend)</option>
            <option value="Full Tuition">Full Tuition Only</option>
            <option value="Living Stipend">Living Stipend</option>
            <option value="Partial Tuition">Partial Tuition</option>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-semibold text-slate-500">
        Showing {scholarships.length} verified scholarship opportunities
      </div>

      {/* Grid */}
      {scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scholarships.map((sch) => (
            <ScholarshipCard key={sch.id} scholarship={sch} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600">No scholarships match your selected filter criteria.</p>
        </div>
      )}
    </div>
  );
}
