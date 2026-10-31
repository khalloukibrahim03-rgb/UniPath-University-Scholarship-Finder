# UniPath — AI-Powered University Discovery & Scholarship Platform

UniPath is an open, student-centered educational discovery and guidance platform designed to help students discover universities, understand admission requirements, find scholarships, track application deadlines, and make informed decisions about their education.

---

## 🚀 Key Features

- 🏛️ **University Discovery:** Search the currently bundled catalogue. Treat seed/demo entries as examples until independently verified against official sources.
- 💰 **Scholarship Finder:** Explore catalogue scholarship entries and confirm deadlines and eligibility on the provider's official website.
- 📋 **Application Dashboard:** Preview application milestones and checklists. Persistent, per-account application storage requires the Supabase integration to be completed.
- 🤖 **Catalogue-Based Guidance:** Search matching catalogue entries. Results are potential matches, not automated eligibility decisions.
- 🛡️ **Source Provenance:** Records should only be treated as verified when the individual claim has current supporting evidence.

---

## ⚙️ Getting Started Locally

The current development branch uses Next.js 16 and React 19. Install dependencies with the committed lockfile using `npm ci`.

### Prerequisites
- Node.js 22.x or newer (Next.js 16)
- npm 10+

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khalloukibrahim03-rgb/UniPath-University-Scholarship-Finder.git
   cd UniPath-University-Scholarship-Finder
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env.local` and set the values you actually use.
   Admin API routes remain disabled unless `ADMIN_SECRET` is configured with a random value of at least 32 characters. Supabase credentials are needed for persistent production data; without them, local seed data is demo-only.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Automated Tests:**
   ```bash
   npm test
   npm run typecheck
   npm run build
   ```

---

## 🚂 Deploying to Railway

This repository includes a Railway configuration. To create a deployment:

1. Push or keep the `feat/unipath-production-hardening` branch on GitHub.
2. In Railway, create a project and choose **Deploy from GitHub repo**.
3. Select this repository and the `feat/unipath-production-hardening` branch.
4. Railway will use Node.js 22, run the Next.js production build, and start the app with `npm run start`.
5. In the Railway service's Variables settings, add only the secrets and integrations you have configured:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase publishable/anon key.
   - `ADMIN_SECRET` — a randomly generated secret of at least 32 characters, required if admin API routes are enabled.
   - `ADMIN_EMAIL` — optional additional admin restriction.
   - `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` — optional server-side AI keys.
6. Generate a Railway domain and check the deployment logs.

**Important:** Do not deploy with fake credentials or expose service-role keys in browser variables. The current app still has production blockers: complete Supabase persistence, student authentication and row-level security, rate limiting, background research scheduling, and verification of scholarship facts. The current catalogue includes unverified demo records. A successful build does not make these features production-ready.

---

## 📄 Documentation

Comprehensive research and architecture documentation is located in the `/docs` directory:
- `competitive-analysis.md`: Evaluation of existing platforms (Campus France, Minhaty, Scholē, etc.)
- `user-research.md`: Student personas and key user journeys
- `product-requirements.md`: Feature priorities (P0, P1, P2)
- `product-differentiation.md`: Unique value proposition and trust mechanisms
- `architecture.md`: System design and tech stack breakdown
- `database-schema.md`: PostgreSQL schema and RLS security policies
- `deadline-monitoring.md`: Change detection and reliable deadline management rules
- `ai-guidance.md`: Grounded AI counselor specification
- `design-system.md`: UI components, color tokens, and RTL readiness
- `security-and-privacy.md`: Security posture and student data privacy compliance
