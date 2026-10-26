# UniPath — Data Integrity Audit & Quality State Lifecycle

**Document Version:** 1.0

---

## 1. Data Quality States Definition

| State | Description | Public Visibility |
| :--- | :--- | :--- |
| `DISCOVERED` | Potential institution/program discovered; awaiting source extraction. | Hidden |
| `UNVERIFIED` | Raw extracted data; awaiting evidence linking. | Hidden |
| `PARTIALLY_VERIFIED` | Some fields verified by official sources; others pending. | Staged in Admin Queue |
| `VERIFIED` | All high-risk claims (deadlines, tuition, prerequisites) verified with source URLs. | Visible in Public Directory |
| `OUTDATED` | Application cycle expired; scheduled for re-verification. | Tagged with Warning Badge |
| `CONFLICTED` | Conflicting facts detected across official sources. | Flagged for Admin Resolution |
| `REJECTED` | Proposal rejected during human admin review. | Hidden |
| `DEMO_ONLY` | Synthetic test data clearly labeled for local development. | Labeled `[Demo]` |

---

## 2. Re-Verification Policy & Expiration Rules

- **Time-Sensitive Deadlines:** Re-verification required every 30 days during active admission cycles.
- **Tuition & Institutional Profiles:** Re-verification required annually.
- **Cycle Expiration:** Application deadlines associated with past academic years (e.g., 2023/2024) are automatically transitioned to `OUTDATED`.
