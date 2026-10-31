# UniPath — Production hardening and product polish

**Working branch:** `feat/unipath-production-hardening`
**Base branch:** `feat/unipath-technical-foundation-9414686074726037842`

## Completed in this branch
- Hardened admin API authorization: a server-side `ADMIN_SECRET` of at least 32 characters is mandatory in all environments; the weak development passkey fallback was removed.
- Removed the personal admin-email fallback from source code and example environment settings. An optional `ADMIN_EMAIL` restriction must be explicitly configured.
- Replaced canned AI claims about tuition, stipends, admission procedures, language scores, and deadlines with conservative catalogue search. Results are labelled as potential matches, not eligibility decisions.
- Added a publication gate requiring explicit approval, a VERIFIED record state, required fields, and field-level VERIFIED evidence with valid source URLs and excerpts.
- Marked bundled sample university, program, and scholarship entries as unverified. Seed data is demonstration content, not proof of current admission or funding availability.
- Rebuilt the homepage with a responsive editorial-style layout, destination shortcuts, discovery sections, source-check reminders, and a clearer call to action.
- Refined responsive navigation, focus states, reduced-motion support, page metadata, and browser theme colour.
- Updated admin-security and AI-guidance tests to reflect the stricter behavior.
- Upgraded the framework runtime to Next.js 16 and React 19, refreshed the npm lockfile automatically, and updated dynamic route parameter handling.
- Upgraded Vitest, Vite, the React Vite plugin, and Zod to patched releases; the regenerated dependency tree reports **0 npm audit vulnerabilities**.
- Added a GitHub Actions workflow for TypeScript, unit tests, and production build.
- Updated README and environment examples to explain demo limitations and production configuration.

## Still required before a production launch
1. Complete Supabase-backed repositories for catalogue, research tasks, evidence, and student applications.
2. Add real sign-in and enforce per-user ownership for profiles and application records; validate all RLS policies against an actual Supabase project.
3. Add server-side rate limiting and abuse controls to public and admin APIs.
4. Implement persistent research worker scheduling, source snapshots, deadline monitoring, and complete admin audit trails.
5. Add end-to-end browser tests and test real mobile, keyboard, and screen-reader flows.
6. Audit all external URLs, current academic cycles, deadlines, tuition, and eligibility directly with each official provider.
7. Configure deployment secrets, Supabase migrations, domain, and hosting; complete a production smoke test.

## Validation status
The latest GitHub Actions run passed dependency installation, npm audit (0 vulnerabilities), TypeScript, all unit tests, and the Next.js production build on the current development branch. A live deployment and production smoke test have not yet been performed.
