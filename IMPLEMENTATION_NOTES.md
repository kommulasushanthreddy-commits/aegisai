# AegisAI Frontend Implementation Notes

## Overview
This document summarizes technical architecture, API contract assumptions, state management decisions, and backend handoff integration points for **AegisAI**.

---

## 1. API Contract & Integration Summary

The frontend is built against the documented REST contract in Section 6.

| Endpoint | Method | Role Req. | Purpose |
|---|---|---|---|
| `/api/auth/login` | `POST` | Public | Authenticates user, returns JWT token & user profile |
| `/api/auth/register` | `POST` | Public | Registers employee/admin user, returns JWT token |
| `/api/auth/me` | `GET` | Authenticated | Retrieves current logged-in session user |
| `/api/redaction/scan` | `POST` | Authenticated | Scans text for PII/secrets, returns entities & masked prompt |
| `/api/redaction/forward` | `POST` | Authenticated | Forwards safe masked prompt to backend LLM engine |
| `/api/phishing/analyze` | `POST` | Authenticated | Scores phishing message, returns risk score, red flags & action advice |
| `/api/scans` | `GET` | Authenticated | Retrieves paginated scan history for user |
| `/api/admin/stats` | `GET` | Admin | Returns KPI metrics, daily scan volume time series & risk breakdown |
| `/api/admin/anomalies` | `GET` | Admin | Returns list of behavioral anomalies flagged by system |
| `/api/audit-log` | `GET` | Admin | Returns append-only cryptographic audit logs & `chainValid` boolean |
| `/api/admin/users` | `GET` | Admin | Returns list of enterprise users for governance |

---

## 2. Mock vs. Real Mode

- **Toggle**: Controlled by `VITE_USE_MOCKS=true` in `frontend/.env`.
- **Mock Behavior**: Implemented in `src/api/mockData.js`. All service calls in `src/api/*.js` simulate network delay (400ms – 900ms) and return structured, realistic security payload data matching the backend REST schema.
- **Real Axios Calls**: Built using a shared instance in `src/api/client.js`.
  - Attaches `Authorization: Bearer <token>` dynamically via request interceptors.
  - Automatically intercepts `401 Unauthorized` responses to clear local session storage and trigger auto-redirection to `/login`.

---

## 3. The Four Pillars Architecture

1. **Safeguarding Sensitive Info (Prompt Redaction Shield)**:
   - Located at `/scan/redaction`.
   - Highlights entity spans inline (`[EMAIL]`, `[API_KEY]`, `[PERSON]`, `[INTERNAL_ORG]`, `[SSN_CREDENTIAL]`).
   - Generates masked prompt with placeholders.
   - Forwards masked prompt to AI model, receiving masked AI reply and local unmasked AI reply for the authorized submitter only.
2. **Threat Detection (Phishing & Social-Engineering Analyzer)**:
   - Located at `/scan/phishing`.
   - Renders radial gauge threat score ($0-100\%$) and color-coded risk badge (Low, Medium, High, Critical).
   - Breaks down evidence red flags with clear labels and one-line explanations.
3. **Threat Detection (Behavioral Anomaly Detector)**:
   - Located at `/admin/anomalies`.
   - Shows plain-English summaries of high-rate prompts, secret pasting, and off-hour access spikes.
4. **Transparency & Trust (Hash-Chained Audit Log)**:
   - Located at `/admin/audit-log`.
   - Renders SHA-256 block hash links (`prevHash` $\rightarrow$ `hash`) and prominent `CHAIN VALID & INTACT` badge when `chainValid: true`.

---

## 4. Backend Handoff Checklist
- Ensure Express backend includes CORS headers allowing `http://localhost:5173` (Vite dev server default).
- Ensure JWT auth token is returned under `{ token, user }` from `/api/auth/login` and `/api/auth/register`.
- Ensure `/api/audit-log` response includes `chainValid: true` property.
