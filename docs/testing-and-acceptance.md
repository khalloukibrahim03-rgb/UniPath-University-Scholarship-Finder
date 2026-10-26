# UniPath — Testing Infrastructure & Acceptance Verification Matrix

**Document Version:** 1.0

---

## 1. Acceptance Verification Matrix

| Acceptance Criteria | Implementation Mechanism | Test Suite Coverage | Status |
| :--- | :--- | :--- | :--- |
| **1. Admin Access Isolation** | Server-side RLS policies (`is_admin_user`) & admin route handlers. | `tests/hybridAISystem.test.ts` | Passed |
| **2. Claim-Level Evidence Linking** | `ClaimEvidence` schema & `researchAgent.ts` service. | `tests/hybridAISystem.test.ts` | Passed |
| **3. Human Approval Requirement** | `ProposedRecord` staging queue; publication blocked until `reviewStatus = 'approved'`. | `tests/hybridAISystem.test.ts` | Passed |
| **4. Grounded Student AI** | `AIGuidanceService` hybrid query engine & classification tags. | `tests/aiGuidance.test.ts` | Passed |
| **5. Data Quality State Badges** | `DataQualityState` ENUM and UI badges (`VERIFIED`, `UNVERIFIED`, `DEMO_ONLY`). | `tests/components.test.tsx` | Passed |

---

## 2. Automated Test Execution Commands

```bash
# Run Vitest test suite
npm test

# Run TypeScript compilation check
./node_modules/.bin/tsc --noEmit

# Run Next.js production build
npm run build
```
