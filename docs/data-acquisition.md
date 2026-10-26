# UniPath — Data Acquisition, Legal Compliance & Extraction Rules

**Document Version:** 1.0

---

## 1. Ethical & Legal Directives for Data Acquisition

1. **Official Priority Hierarchy:**
   - **Tier 1:** Official institutional university portals (`.ac.ma`, `.edu`, `.fr`, `.de`).
   - **Tier 2:** Government education portals (e.g., Moroccan Ministry of Higher Education, Minhaty, Campus France Morocco, DAAD, CSC China).
   - **Tier 3:** Recognized national exam portals (e.g. Concours National Commun).
   - Third-party portals may only be used for discovery and cross-referencing; they NEVER establish verification.

2. **Access Rules & Terms Compliance:**
   - Adhere strictly to `robots.txt` directives.
   - Enforce rate limits (maximum 1 request per 10 seconds per domain).
   - Identify with `User-Agent: UniPathBot/1.0 (+https://unipath.edu/bot-info)`.
   - Never bypass CAPTCHAs, paywalls, login gates, or IP blocks.

3. **No Synthetic/Invented Data in Production:**
   - Synthetic demonstration records must be explicitly tagged `DEMO_ONLY`.
   - Missing fields must remain `UNVERIFIED` or `UNKNOWN` rather than guessed.
