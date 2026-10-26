"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, CheckCircle2, ExternalLink, Bot, HelpCircle, ShieldAlert, Check } from "lucide-react";
import { GuidanceResponse, ResultClassification } from "@/lib/services/aiGuidance";

export const AIGuidanceBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<GuidanceResponse | null>(null);

  const samplePrompts = [
    "What are Moroccan engineering school admission rules (ENSIAS, EMI, UM6P)?",
    "How do I apply via Campus France Morocco for Sorbonne?",
    "What are DAAD Germany scholarship eligibility requirements?",
    "Which full-ride scholarships cover Master degrees in Europe?"
  ];

  const handleAsk = async (promptQuery?: string) => {
    const q = promptQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai-guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data: GuidanceResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("AI Guidance fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getClassificationBadge = (cls?: ResultClassification) => {
    if (cls === "Matches Documented Criteria") {
      return <Badge variant="verified" className="flex items-center gap-1"><Check className="w-3 h-3" /> Matches Documented Criteria</Badge>;
    } else if (cls === "Potential Match") {
      return <Badge variant="unverified" className="flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Potential Match</Badge>;
    } else if (cls === "Does Not Match Documented Requirement") {
      return <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200">Unmet Criteria</Badge>;
    }
    return <Badge variant="secondary" className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-slate-500" /> Insufficient Info</Badge>;
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-amber-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-900 text-white rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-blue-950">
                Grounded AI Student Admissions Counselor
              </CardTitle>
              <p className="text-xs text-slate-600">
                Source-verified explanations & requirement matching strictly over approved records
              </p>
            </div>
          </div>
          <Badge variant="verified">100% Grounded</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sample Prompts */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-blue-800" /> Frequently Asked Questions:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(p);
                  handleAsk(p);
                }}
                className="text-xs bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 rounded-full px-3 py-1 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about admissions rules, required documents, or deadlines..."
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="bg-white"
          />
          <Button
            onClick={() => handleAsk()}
            disabled={loading || !query.trim()}
            variant="primary"
            className="gap-1 shrink-0"
          >
            {loading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Ask</span>
              </>
            )}
          </Button>
        </div>

        {/* Output Panel */}
        {response && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Result Classification:</span>
              {getClassificationBadge(response.classification)}
            </div>

            <div className="prose prose-sm max-w-none text-slate-800 space-y-2 whitespace-pre-line">
              {response.answerMarkdown}
            </div>

            {/* Checklist */}
            {response.suggestedChecklist && response.suggestedChecklist.length > 0 && (
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                <p className="text-xs font-bold text-blue-950 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" /> Action Checklist for Application:
                </p>
                <ul className="space-y-1 text-xs text-slate-700">
                  {response.suggestedChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-700 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source Provenance */}
            {response.citedSources && response.citedSources.length > 0 && (
              <div className="pt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-500">Cited Verified Sources:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {response.citedSources.map((source, i) => (
                    <a
                      key={i}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded border border-slate-200 text-[11px]"
                    >
                      <span>{source.title}</span>
                      <Badge variant="verified" className="text-[9px] py-0 px-1">{source.dataQualityState || "VERIFIED"}</Badge>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
