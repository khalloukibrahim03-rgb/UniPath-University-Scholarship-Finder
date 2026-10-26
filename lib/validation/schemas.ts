import { z } from "zod";

export const SearchFilterSchema = z.object({
  query: z.string().optional(),
  country: z.string().optional(),
  degreeLevel: z.enum(["Bachelor", "Master", "Doctorate", "Certificate", "Diploma", "All"]).optional(),
  maxTuition: z.number().nonnegative().optional(),
  language: z.string().optional(),
  coverageType: z.enum(["Full Ride", "Full Tuition", "Partial Tuition", "Living Stipend", "All"]).optional(),
});

export const GuidanceRequestSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long"),
  studentProfile: z.object({
    educationLevel: z.string().optional(),
    baccalaureateTrack: z.string().optional(),
    nationality: z.string().optional(),
    budget: z.number().optional(),
  }).optional(),
  contextProgramId: z.string().optional(),
  contextScholarshipId: z.string().optional(),
});

export const UserApplicationCreateSchema = z.object({
  programId: z.string().optional(),
  scholarshipId: z.string().optional(),
  status: z.enum(["Saved", "Preparing Docs", "Submitted", "Interview Scheduled", "Accepted", "Rejected"]).default("Saved"),
  notes: z.string().optional(),
  targetDeadline: z.string(),
});

export const TaskToggleSchema = z.object({
  taskId: z.string(),
  isCompleted: z.boolean(),
});
