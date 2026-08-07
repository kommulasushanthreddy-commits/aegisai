# Shield AI — Enterprise AI Security, Privacy & Trust Gateway

[![Hackathon Submission](https://img.shields.io/badge/Theme-AI%20Security%2C%20Privacy%20%26%20Trust-14b8a6?style=for-the-badge)](https://github.com)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb?style=for-the-badge)](https://reactjs.org/)
[![Node.js Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-68a063?style=for-the-badge)](https://expressjs.com/)
[![Cryptographic Audit](https://img.shields.io/badge/Audit-SHA--256%20Hash%20Chain-purple?style=for-the-badge)](https://github.com)

Shield AI is an enterprise gateway that employees route their AI prompts and suspicious messages through. It redacts sensitive company data, credentials, and project codenames before prompts reach third-party LLMs, scores phishing messages with explainable red flags, flags behavioral anomalies, and writes all security operations to an append-only, tamper-evident SHA-256 hash-chained audit log.

---

## 🏛️ The Four Pillars

| Pillar | Feature | Description |
|---|---|---|
| **Safeguarding Sensitive Info** | **Prompt Redaction Shield** | Detects PII, API keys, credentials, and internal project codenames (`[EMAIL]`, `[API_KEY]`, `[PERSON]`, `[INTERNAL_ORG]`, `[SSN]`). Masks them before sending to public LLMs and unmasks replies locally for authorized submitters. |
| **Threat Detection** | **Phishing & Social-Engineering Analyzer** | Scores threat levels ($0-100\%$) and provides explainable evidence red flags (urgency language, domain mismatches, suspicious auth links, financial diversion). |
| **Threat Detection** | **Behavioral Anomaly Detector** | Real-time plain-English flags for unusual account activity, bulk secret pasting, and off-hour access spikes for security administrators. |
| **Transparency & Trust** | **Cryptographic Audit Log** | Append-only SHA-256 block chain linkage (`prevHash` $\rightarrow$ `hash`) with real-time `CHAIN VALID & INTACT` verification. |

---

## 🏗️ Architecture

```
React Frontend (Vite, Port 5173)
    │  (JWT Bearer Auth & Zod Payload Validation)
    ▼
Node.js Express Backend (Port 5000)
    ├── /api/auth          (JWT Auth & bcrypt Password Hashing)
    ├── /api/redaction     (Prompt Redaction Security Engine)
    ├── /api/phishing      (Phishing Threat Scoring Engine)
    ├── /api/scans         (User Scan History)
    ├── /api/admin         (SOC Stats, Anomalies, User Governance)
    └── /api/audit-log     (SHA-256 Hash-Chained Cryptographic Audit Log)
```

---

## 🚀 Quick Start Guide

### 1. Clone & Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
- Open **http://localhost:5173**

### 2. Setup & Start Backend
```bash
cd backend
npm install
npm start
```
- Backend runs on **http://localhost:5000**

---

## 🔒 Security Compliance Highlights
- **Zero AI Provider Keys in Client**: No AI keys exist in frontend code or environment files.
- **Scoped Unmasking**: Original unmasked prompts and AI replies are rendered strictly for the authorized submitter within local component state.
- **Tamper-Evident Audit Log**: Every scan/redaction generates a SHA-256 block hash linked to the previous block hash.

---

## 📄 Documentation
- [`IMPLEMENTATION_NOTES.md`](./IMPLEMENTATION_NOTES.md): Complete REST API contract specifications.
- [`frontend/README.md`](./frontend/README.md): Detailed frontend documentation.
