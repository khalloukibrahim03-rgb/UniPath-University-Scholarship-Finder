"use client";

import React, { useState } from "react";
import { UniversityCard } from "@/components/shared/UniversityCard";
import { DataService } from "@/lib/services/dataService";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { GraduationCap, Search, Filter } from "lucide-react";

export default function UniversitiesPage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [maxTuition, setMaxTuition] = useState<number>(0);

  const availableCountries = DataService.getAvailableCountries();

  const universities = DataService.getUniversities({
    query,
    country,
    maxTuition: maxTuition > 0 ? maxTuition : undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <span>University Discovery Directory</span>
        </div>
        <h1 className="text-3xl font-black text-blue-950">Explore Verified Universities & Programs</h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Search accredited public and private universities with source-verified application requirements, tuition breakdown, and direct official portal links.
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
            placeholder="Search university name, city, program..."
            className="pl-9"
          />
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="All">All Countries</option>
            {availableCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        {/* Max Tuition Filter */}
        <div>
          <Select
            value={maxTuition}
            onChange={(e) => setMaxTuition(Number(e.target.value))}
          >
            <option value={0}>Any Tuition Budget</option>
            <option value={500}>Under €500 / year (Low Tuition Public)</option>
            <option value={5000}>Under €5,000 / year</option>
            <option value={15000}>Under €15,000 / year</option>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-semibold text-slate-500">
        Showing {universities.length} verified university profiles
      </div>

      {/* Grid */}
      {universities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600">No universities match your selected filter criteria.</p>
        </div>
      )}
    </div>
  );
}
