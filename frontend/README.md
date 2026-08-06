# AegisAI — Frontend (React + Vite)

AegisAI is an enterprise AI Gateway and Threat Detection frontend built for the hackathon theme **"AI Security, Privacy & Trust"**. It intercepts employee prompts before they reach public LLMs (masking PII, credentials, API keys, and internal codenames), scores incoming messages for social engineering threats with explainable evidence flags, tracks behavioral anomalies, and writes all security events to an append-only, tamper-evident hash-chained audit log.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `frontend` root:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCKS=true
```

> **Note:** Setting `VITE_USE_MOCKS=true` enables the offline interactive mock layer with artificial network delay. When ready to connect to a live backend service, set `VITE_USE_MOCKS=false`.

### 3. Launch Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Security Compliance Verification
- **Zero AI Keys in Client**: No AI provider API keys (OpenAI/Claude/Gemini) exist anywhere in frontend code or environment files.
- **Backend Routing Only**: Browser network requests exclusively target `VITE_API_BASE_URL` or fallback to the client mock engine.
- **Unmasking Scoping**: Original unmasked prompts and AI replies are rendered strictly for the authorized submitter within local component state.
