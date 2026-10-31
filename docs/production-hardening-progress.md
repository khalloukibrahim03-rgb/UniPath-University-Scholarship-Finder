# UniPath production hardening — current implementation status

This branch is an isolated improvement branch. The original branch is unchanged.

## Implemented in this pass
- Admin API authorization now requires a configured server-side `ADMIN_SECRET` of at least 32 characters in development and production. The weak development passkey bypass is removed.
- Removed the personal admin email fallback from application code and the example environment file. `ADMIN_EMAIL` is now optional deployment configuration.
- AI guidance no longer emits hard-coded country-specific tuition, stipend, language, admissions, or deadline claims. It searches the local catalogue and only cites matching entries marked verified with valid HTTP(S) source URLs and non-expired scholarship deadlines. It labels results as potential matches, not eligibility decisions.
- Publishing proposed universities and scholarships now requires explicit approval, a VERIFIED record state, required fields, and matching VERIFIED field-level evidence with source URL, source title, and excerpt. Fabricated default dates, fees, rankings, and eligibility requirements were removed.
- README and environment examples now distinguish demo catalogue behavior from production persistence and explain required admin configuration.

## Important remaining work
This is not a claim that every module is production-complete. The following require further implementation and environment-specific validation:
1. Replace in-memory catalogue, research queue, and application tracking with Supabase repositories and server-side authenticated access.
2. Add account-level student profile/application CRUD, ownership checks, deletion flows, and RLS integration tests.
3. Add rate limiting and abuse controls to public AI guidance and admin endpoints.
4. Build and test research worker ingestion, source snapshots, deadline re-check scheduling, and human review/audit persistence.
5. Add schema migration validation, CI build/typecheck/test jobs, and end-to-end tests.
6. Audit all seed records and mark unsupported or stale claims as DEMO_ONLY/OUTDATED until verified from official sources.

## Validation
The GitHub connector was used to commit source changes. A local install, Next.js build, TypeScript check, and Vitest run have not been executed in this environment. Do not deploy until CI and Supabase configuration are verified.
