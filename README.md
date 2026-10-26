# UniPath — AI-Powered University Discovery & Scholarship Platform

UniPath is an open, student-centered educational discovery and guidance platform designed to help students discover universities, understand admission requirements, find scholarships, track application deadlines, and make informed decisions about their education.

---

## 🚀 Key Features

- 🏛️ **University Discovery:** Search and filter verified universities across France, Germany, China, Morocco, and globally.
- 💰 **Scholarship Finder:** Search full-ride, full-tuition, and stipend scholarships tailored for African and international candidates.
- 📋 **Application Dashboard:** Bookmark programs, track application milestones (Saved -> Preparing Docs -> Submitted), and manage interactive checklists.
- 🤖 **Zero-Cost Grounded AI Guidance:** Get clear, source-cited explanations of application procedures without needing paid API keys.
- 🛡️ **Source Provenance:** Every deadline and requirement includes a verification status badge and link to official university portals.

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm 9+

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

3. **Set up Environment Variables (Optional):**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Note: The application runs completely offline using local seed data out of the box without requiring API keys!*

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
3. No environment variables are strictly required for the demo, but you may supply `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if connected to a live Supabase database.
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
