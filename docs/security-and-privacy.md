# UniPath — Security, Privacy & Administrative Access Control

**Document Version:** 2.0
**Date:** October 2026

---

## 1. Security Architecture & Server-Side Gating

UniPath strictly isolates private administrative research tools (System A) from public student discovery tools (System B).

1. **Server-Side Authorization:** All administrative API routes (`/api/admin/research-tasks`, `/api/admin/proposed-records`) enforce server-side validation via `isAuthorizedAdmin()`. In production environments, `process.env.ADMIN_SECRET` is strictly required. Unauthenticated or unauthorized requests receive HTTP 401 Unauthorized or HTTP 403 Forbidden.
2. **Unpublished Data Isolation:** Staged research proposals (`review_status = 'pending_review'`) reside strictly in administrative queues and are **NEVER** returned by public search APIs (`/universities`, `/scholarships`, `/api/ai-guidance`).
3. **Database Row Level Security (RLS):** RLS policies on Supabase PostgreSQL tables restrict SELECT/UPDATE permissions on `research_tasks`, `research_task_logs`, `proposed_records`, and `admin_audit_logs` strictly to authenticated users with `role = 'admin'` or `service_role`.
4. **Secret Hygiene:** All client-side accessible variables use `NEXT_PUBLIC_` prefixes. Database service keys, JWT secrets, and AI provider API keys remain strictly server-side.

---

## 2. Student Privacy & Minimal Data Retention

- **Data Minimization:** UniPath only collects fields necessary for application recommendations (Name, Email, Academic level, Baccalaureate track, Target country).
- **Sensitive Documents Policy:** UniPath **NEVER** requests or stores sensitive identity documents (e.g., passport scans, national ID numbers, banking records).
- **Deletion Rights:** Users have full rights to delete their account and application records (`ON DELETE CASCADE` enforced across database constraints).
