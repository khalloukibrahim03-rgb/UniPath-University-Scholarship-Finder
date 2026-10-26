# UniPath — Hybrid AI Research & Verification System Implementation Plan

**Document Version:** 2.0
**Date:** October 2024
**Author:** Senior Software Architect & AI Systems Engineer

---

## 1. Executive Summary & Existing Capabilities Audit

### 1.1 Existing System Capabilities
- **Frontend Architecture:** Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide icons, responsive layout with LTR/RTL readiness.
- **Public Discovery & Dashboard:**
  - `/universities`: University directory search with country and tuition filters.
  - `/universities/[id]`: University detail page showcasing academic programs, tuition, and mandatory admission prerequisites.
  - `/scholarships`: Scholarship database search with coverage filters (Full Ride, Full Tuition, Living Stipend).
  - `/dashboard`: Student application pipeline tracking saved programs and interactive milestone task checklists.
- **Student AI Assistant (System B Foundation):**
  - `/api/ai-guidance`: Pluggable AI counselor interface.
  - `AIGuidanceService`: Zero-cost local deterministic rule engine operating over seed dataset with source citations.
- **Data Model & Storage:**
  - `supabase/migrations/20241026000000_initial_schema.sql`: PostgreSQL schema for `universities`, `academic_programs`, `admission_requirements`, `scholarships`, `student_profiles`, `user_applications`, and `application_tasks`.
  - Row Level Security (RLS) policies enforcing user isolation for student applications.
- **Testing Infrastructure:** Vitest test suite (`npm test`) covering data services, AI guidance engine, and component rendering.

---

## 2. Identified Architecture, Security, and Data-Integrity Gaps

### 2.1 Architecture Gaps
1. **Missing Private Research Agent System (System A):**
   - No private administrative workspace (`/admin`) for entering natural-language research instructions.
   - Absence of research task pipeline entities (`research_tasks`, `research_task_logs`, `proposed_records`).
2. **Lack of Claim-Level Verification:**
   - Existing schema attaches verification status (`verified`/`unverified`) at the record level (`universities`, `scholarships`).
   - Granular claim-level evidence tracking (linking specific claims like deadlines, tuition fees, or admission prerequisites to exact source URLs, timestamps, and excerpt quotes) is missing.
3. **No Human Approval Workflow:**
   - No mechanism for staging proposed university updates from AI research before publishing to the public database.

### 2.2 Security Risks
1. **Missing Administrative Role & Access Control:**
   - Lack of explicit server-side role check (`is_admin`) gating access to administrative APIs and routes.
2. **Public Exposure Risk:**
   - Unverified or staged research proposals could leak to public search endpoints if not strictly filtered by publication status.

### 2.3 Data-Integrity Risks
1. **Academic Cycle & Deadline Freshness:**
   - Risk of treating outdated application cycles (e.g. 2023/2024 deadlines) as current without explicit academic intake cycle tracking (`academic_cycle`).
2. **Source Over-Trust:**
   - Risk of marking an entire institution `VERIFIED` merely because its website or name was confirmed, without verifying individual program deadlines or eligibility criteria.

---

## 3. Proposed Hybrid AI System Architecture

```
+-----------------------------------------------------------------------------------+
|                            PRIVATE ADMIN WORKSPACE                                |
|  - Natural-Language Task Creator ("Research Moroccan Engineering Schools...")       |
|  - Research Task Monitoring Queue                                                  |
|  - Field-by-Field Evidence Review & Approval Modal                                |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                       SYSTEM A: UNIPATH RESEARCH AGENT                            |
|  1. Task Creation -> 2. Source Discovery -> 3. Evidence Collection                 |
|  4. Structured Extraction -> 5. Claim-Level Evidence Linking                       |
|  6. Deterministic Validation -> 7. Staging Proposed Record (UNPUBLISHED)          |
+-----------------------------------------------------------------------------------+
                                          |
                                          v  (Requires Human Admin Approval)
+-----------------------------------------------------------------------------------+
|                          APPROVED PRODUCTION DATABASE                             |
|  Data Quality States: DISCOVERED | UNVERIFIED | VERIFIED | OUTDATED | CONFLICTED   |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        SYSTEM B: PUBLIC STUDENT AI                                |
|  - Hybrid Deterministic Query Engine + Grounded AI Explanations                   |
|  - Result Classifications: Matches | Potential Match | Does Not Match | Insufficient |
+-----------------------------------------------------------------------------------+
```

---

## 4. Implementation Phases & Milestones

### Phase 1 — Audit & Plan (Current)
- Complete repository audit and publish `/docs/hybrid-ai-implementation-plan.md`.

### Phase 2 — Extended Schema & Security
- Add database migration `20241026000001_hybrid_ai_system.sql`:
  - `research_tasks`, `research_task_logs`, `proposed_records`, `claim_evidences`, `admin_audit_logs`.
  - Quality states: `DISCOVERED`, `UNVERIFIED`, `PARTIALLY_VERIFIED`, `VERIFIED`, `OUTDATED`, `CONFLICTED`, `REJECTED`, `DEMO_ONLY`.
  - RLS policies ensuring public users cannot read unpublished proposals or research task logs.

### Phase 3 — Private Research Agent Implementation
- Implement `lib/services/researchAgent.ts`:
  - Natural language instruction parser.
  - Source discovery prioritized for official Moroccan portals (Campus France Morocco, Minhaty, UM6P, EHTP, EMI, ENSIAS, ENAM, public universities).
  - Claim-level evidence generator linking exact claims to source URLs and verification timestamps.
  - Deterministic validation engine checking for missing mandatory fields, invalid URLs, and expired intake dates.

### Phase 4 — Administrative Review Queue (`/admin`)
- Create `/admin` workspace:
  - Task creation form with preset instruction templates.
  - Proposed records queue showing side-by-side diff (proposed vs current database value) and claim-level evidence inspection.
  - Approve, reject, edit, and audit trail actions.

### Phase 5 — Public Student AI & Grounded Query Engine
- Extend `AIGuidanceService` and data layer:
  - Deterministic database query matching combined with grounded AI explanation.
  - Result classification tags (`Matches Documented Criteria`, `Potential Match`, `Does Not Match`, `Insufficient Information`).

### Phase 6 — Testing & Verification
- Comprehensive Vitest suite covering security boundaries, evidence verification, approval gating, and claim tracking.
- Pre-commit instructions execution and submission report.

---

## 5. Acceptance Criteria & Cost Implications

### 5.1 Acceptance Criteria
1. Public visitors cannot access `/admin` or view unpublished proposed records.
2. Every published claim for new universities/scholarships includes claim-level source URLs and `verified_at` timestamps.
3. No proposed record is automatically published without human admin approval.
4. Synthetic demo records are explicitly tagged `DEMO_ONLY` and cannot be mistaken for real production data.
5. Student AI responses strictly cite approved database records and communicate uncertainty when data is missing.

### 5.2 Cost & Resource Analysis
- **Execution Cost:** $0 / Month on free-tier services.
- **Local Fallback Engine:** Executes locally with zero paid API key dependency.
- **Optional External Providers:** Integrates with `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` when configured.
