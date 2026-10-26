"use client";

import React, { useState } from "react";
import { DataService } from "@/lib/services/dataService";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, CheckSquare, Square, Plus, Trash2, Clock, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ApplicationDashboardPage() {
  const [applications, setApplications] = useState(DataService.getUserApplications());

  const toggleTask = (appId: string, taskId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          tasks: app.tasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        };
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <LayoutDashboard className="w-5 h-5 text-amber-500" />
            <span>Personal Application Pipeline</span>
          </div>
          <h1 className="text-3xl font-black text-blue-950">Student Application Tracker</h1>
          <p className="text-sm text-slate-600">
            Track your saved program applications, document checklists, and upcoming deadlines in one place.
          </p>
        </div>
      </div>

      {/* Grid of Saved Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app) => {
          const completedTasksCount = app.tasks.filter((t) => t.isCompleted).length;
          const totalTasksCount = app.tasks.length;
          const progressPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

          return (
            <Card key={app.id} className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="primary" className="bg-blue-100 text-blue-900">
                    {app.status}
                  </Badge>
                  <span className="text-xs font-semibold text-amber-900 flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-amber-700" /> Target: {formatDate(app.targetDeadline)}
                  </span>
                </div>

                <CardTitle className="text-lg font-bold text-blue-950 mt-2">
                  {app.programTitle || app.scholarshipTitle}
                </CardTitle>
                <CardDescription className="text-xs text-slate-600 font-medium">
                  {app.universityName || app.providerName}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Document Checklist Progress</span>
                    <span>{progressPercentage}% Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Notes */}
                {app.notes && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 italic">
                    "{app.notes}"
                  </div>
                )}

                {/* Tasks List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">Required Milestone Tasks:</span>
                  <div className="space-y-1.5">
                    {app.tasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(app.id, task.id)}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-xs text-left transition-colors ${
                          task.isCompleted ? "bg-emerald-50 text-slate-500 line-through" : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        {task.isCompleted ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className="flex-1">{task.taskTitle}</span>
                        {task.dueDate && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            Due: {formatDate(task.dueDate)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
