# UniPath — Database Schema & Data Model Specification

**Document Version:** 2.0
**Target Database:** PostgreSQL (Supabase Compatible)

---

## 1. Relational Entity Relationship Architecture

```
+----------------+       +-------------------+       +-----------------------+
|  universities  | 1---N | academic_programs | 1---N | admission_requirements|
+----------------+       +-------------------+       +-----------------------+
        |                         |
        | 1                       | 1
        |                         |
        v N                       v N
+----------------+       +-------------------+
|  scholarships  |       | student_profiles  |
+----------------+       +-------------------+
        |                         |
        v N                       v N
+--------------------------------------------+
|            user_applications               |
+--------------------------------------------+

---------------- ADMINISTRATIVE SCHEMA ----------------

+-----------------+       +-----------------------+
| research_tasks  | 1---N |  research_task_logs   |
+-----------------+       +-----------------------+
        |
        | 1
        v N
+-----------------+       +-----------------------+
| proposed_records| 1---N |    claim_evidences    |
+-----------------+       +-----------------------+
```

---

## 2. Table Specifications & Migration Scripts

All tables and Row Level Security policies are version-controlled in `/supabase/migrations/`:
1. `20241026000000_initial_schema.sql`: Public higher education entities (`universities`, `academic_programs`, `admission_requirements`, `scholarships`, `student_profiles`, `user_applications`, `application_tasks`).
2. `20241026000001_hybrid_ai_system.sql`: System A administrative research entities (`admin_users`, `research_tasks`, `research_task_logs`, `proposed_records`, `claim_evidences`, `admin_audit_logs`).
