"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Bot, CheckCircle2, XCircle, Search, ExternalLink, RefreshCw, FileText, Check, AlertTriangle, Clock } from "lucide-react";
import { ResearchTask, ProposedRecord } from "@/types";

export default function AdminWorkspacePage() {
  const [instruction, setInstruction] = useState("");
  const [targetInst, setTargetInst] = useState("");
  const [targetCountry, setTargetCountry] = useState("Morocco");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ResearchTask[]>([]);
  const [proposedRecords, setProposedRecords] = useState<ProposedRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ProposedRecord | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "tasks" | "audit">("queue");

  const fetchAdminData = async () => {
    try {
      const [tasksRes, recordsRes] = await Promise.all([
        fetch("/api/admin/research-tasks"),
        fetch("/api/admin/proposed-records"),
      ]);
      const tasksData = await tasksRes.json();
      const recordsData = await recordsRes.json();

      if (tasksData.tasks) setTasks(tasksData.tasks);
      if (recordsData.records) {
        setProposedRecords(recordsData.records);
        if (recordsData.records.length > 0 && !selectedRecord) {
          setSelectedRecord(recordsData.records[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateTask = async () => {
    if (!instruction.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/research-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instruction,
          targetInstitution: targetInst || undefined,
          targetCountry,
          taskType: "research_university",
        }),
      });
      const data = await res.json();
      if (data.task) {
        setInstruction("");
        setTargetInst("");
        fetchAdminData();
      }
    } catch (err) {
      console.error("Task creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = async (proposedRecordId: string, action: "approve" | "reject", rejectionReason?: string) => {
    try {
      const res = await fetch("/api/admin/proposed-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposedRecordId,
          action,
          rejectionReason,
        }),
      });
      const data = await res.json();
      if (data.record) {
        fetchAdminData();
      }
    } catch (err) {
      console.error("Review action error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Private Administrative Workspace</span>
          </div>
          <h1 className="text-2xl font-black">UniPath Research Agent & Data Review Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop verification portal. Research proposals MUST receive admin approval before reaching public student datasets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={fetchAdminData} className="gap-1.5 bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Queue</span>
          </Button>
        </div>
      </div>

      {/* Task Trigger Bar */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-base font-bold text-blue-950 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-900" />
            <span>Submit Natural Language Research Instruction</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-600">
            Instruct the UniPath Research Agent to discover official website sources, extract admission rules, and link claim-level evidence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <Input
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g. Research Moroccan engineering schools computer science programs and official application deadlines..."
                className="bg-white"
              />
            </div>
            <div>
              <Input
                value={targetInst}
                onChange={(e) => setTargetInst(e.target.value)}
                placeholder="Target Institution (e.g. ENSIAS Rabat)"
                className="bg-white"
              />
            </div>
            <div>
              <Select value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)} className="bg-white">
                <option value="Morocco">Morocco</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="China">China</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-blue-100">
            <div className="text-xs text-slate-500 italic">
              Example: "Research Moroccan engineering schools (ENSIAS, EMI, EHTP) deadlines and official portal URLs."
            </div>
            <Button
              onClick={handleCreateTask}
              disabled={loading || !instruction.trim()}
              variant="primary"
              size="sm"
              className="gap-1.5"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
              <span>Run Research Agent</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workspace Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("queue")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "queue" ? "border-blue-900 text-blue-950" : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Pending Review Queue ({proposedRecords.filter((r) => r.reviewStatus === "pending_review").length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tasks")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "tasks" ? "border-blue-900 text-blue-950" : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Research Tasks & Logs ({tasks.length})</span>
        </button>
      </div>

      {/* TAB 1: REVIEW QUEUE */}
      {activeTab === "queue" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Staged Research Proposals</h3>
            {proposedRecords.length > 0 ? (
              proposedRecords.map((record) => (
                <Card
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={`cursor-pointer transition-all ${
                    selectedRecord?.id === record.id ? "border-blue-900 ring-2 ring-blue-900/10 bg-blue-50/20" : "hover:border-slate-300"
                  }`}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <Badge variant={record.reviewStatus === "approved" ? "verified" : record.reviewStatus === "rejected" ? "unverified" : "secondary"}>
                        {record.reviewStatus}
                      </Badge>
                      <span className="text-[11px] font-mono text-slate-400">{record.verificationStatus}</span>
                    </div>
                    <CardTitle className="text-sm font-bold text-blue-950">
                      {record.proposedData?.name || record.proposedData?.title || "Proposed Institution"}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 line-clamp-1">
                      Target: {record.proposedData?.country || "Morocco"} • {record.claimEvidences.length} Claim Evidences
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center bg-white rounded-lg border border-slate-200">
                No research proposals currently pending review.
              </p>
            )}
          </div>

          {/* Evidence Details Column */}
          <div className="lg:col-span-2">
            {selectedRecord ? (
              <Card className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="primary" className="text-xs">{selectedRecord.entityType}</Badge>
                      <CardTitle className="text-xl font-bold text-blue-950 mt-1">
                        {selectedRecord.proposedData?.name || selectedRecord.proposedData?.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-600">
                        Official Website: <a href={selectedRecord.proposedData?.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-900 underline">{selectedRecord.proposedData?.websiteUrl}</a>
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedRecord.reviewStatus === "pending_review" && (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleReviewAction(selectedRecord.id, "approve")}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve & Publish</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReviewAction(selectedRecord.id, "reject", "Failed evidence validation")}
                            className="gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Proposed Data Fields Summary */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Proposed Extracted Data Fields:</h4>
                    <pre className="text-xs font-mono bg-white p-3 rounded border border-slate-200 overflow-x-auto text-slate-800 max-h-48">
                      {JSON.stringify(selectedRecord.proposedData, null, 2)}
                    </pre>
                  </div>

                  {/* Claim-Level Evidence Links */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Claim-Level Supporting Evidences ({selectedRecord.claimEvidences.length}):
                    </h4>

                    {selectedRecord.claimEvidences.map((ev) => (
                      <div key={ev.id} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span className="text-blue-950 font-semibold">{ev.fieldName}: {ev.claimValue}</span>
                          <Badge variant="verified" className="text-[10px]">{ev.sourceType}</Badge>
                        </div>
                        <p className="text-slate-600 italic border-l-2 border-emerald-500 pl-2 my-1">
                          "{ev.evidenceExcerpt}"
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>Source: <a href={ev.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:underline">{ev.sourceTitle}</a></span>
                          <span className="font-mono">Verified: {ev.verifiedAt} ({ev.academicCycle})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                Select a research proposal from the left queue to inspect claim-level evidence.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TASKS & LOGS */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="border-slate-200">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="primary" className="bg-blue-100 text-blue-900">{task.status}</Badge>
                  <span className="font-mono text-slate-400">{task.createdAt}</span>
                </div>
                <CardTitle className="text-base font-bold text-blue-950 mt-1">{task.instruction}</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Target: {task.targetInstitution || task.targetCountry}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <h5 className="text-xs font-bold text-slate-700">Agent Step Logs:</h5>
                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs space-y-1">
                  {task.logs?.map((log) => (
                    <div key={log.id} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">[{log.logLevel.toUpperCase()}]</span>
                      <span className="text-slate-300">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
