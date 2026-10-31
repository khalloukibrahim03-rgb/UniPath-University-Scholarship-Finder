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
   git clone https://github.com/your-username/unipath.git
   cd unipath
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Admin API routes remain disabled unless `ADMIN_SECRET` is configured with a random value of at least 32 characters. Supabase credentials are needed for persistent production data; without them, local seed data is demo-only.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Automated Tests:**
   ```bash
   npm test
   ```

---

## 📦 Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and a strong server-side `ADMIN_SECRET` in Vercel project settings. Configure `ADMIN_EMAIL` if you want an additional email-header restriction. Do not commit real secrets.
4. Deploy!

---

## 📄 Documentation

Comprehensive research and architecture documentation is located in the `/docs` directory:
- `competitive-analysis.md`: Evaluation of existing platforms (Campus France, Minhaty, Scholē, etc.)
- `user-research.md`: Student personas (Moroccan/African applicants) and key user journeys
- `product-requirements.md`: Feature priorities (P0, P1, P2)
- `product-differentiation.md`: Unique value proposition and trust mechanisms
- `architecture.md`: System design and tech stack breakdown
- `database-schema.md`: PostgreSQL schema and RLS security policies
- `deadline-monitoring.md`: Change detection and reliable deadline management rules
- `ai-guidance.md`: Zero-cost grounded AI counselor specification
- `design-system.md`: UI components, color tokens, and RTL readiness
- `security-and-privacy.md`: Security posture and student data privacy compliance
