# 🚀 SteerHire – The AI Technical Interviewer & Career Accelerator

> **Problem Statement**: *"The Interview Agent – Build the interviewer, not the interview."*

SteerHire is an award-winning, Apple HIG + Linear inspired AI SaaS platform designed to conduct adaptive technical mock interviews out loud. By parsing PDF candidate resumes and dynamically probing architectural trade-offs in real time, SteerHire delivers instant hiring committee evaluation reports.

---

## 🌟 Key Product Capabilities

- 🤖 **Adaptive 3D AI Interviewer (`AppleThreeDOrb.tsx`)**: Real WebGL 3D interactive AI sphere with metallic reflections, voice speech output, and real-time wireframe halos.
- 📄 **Resume PDF Intelligence Parsing**: Drag-and-Drop PDF parser that automatically extracts candidate skill matrices, past projects, and experience years to tailor probing questions.
- 🎤 **Real-time Voice & Speech Synthesis**: Integrated Web Speech API for natural voice answers and out-loud question playback.
- 📊 **Hiring Committee Scorecard Reports**: Detailed report breakdowns spanning Technical Depth, Communication Clarity, Confidence, and Problem Solving with actionable improvement roadmaps.
- ⚡ **Raycast & Linear Bento Grid Workspace**: Candidate AI command center with `Cmd+K` quick actions, Recharts analytics, and session history tables.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack) & React 19
- **Graphics & Motion**: Three.js, React Three Fiber, Framer Motion
- **AI Probing Engine**: Google Gemini 2.5 (`@google/genai`)
- **Database & Auth**: Supabase PostgreSQL & Row-Level Security
- **Styling**: Vanilla CSS, TailwindCSS v4, Light Luxury Glassmorphic Design System (`#f8fafc`)

---

## 🚀 Quick Setup & Local Run

```bash
# 1. Clone repository
git clone https://github.com/Shubh-Patel-07/interview-agent.git
cd interview-agent

# 2. Install dependencies
npm install

# 3. Launch dev server
npm run dev
```

Open `http://localhost:3000` in your browser to experience the platform!

---

## 🌐 Verified Production Routes

- `/` – Apple Keynote Landing Page & Bento Capability Matrix
- `/setup` – Candidate Session Configuration Wizard
- `/resume` – PDF Resume Intelligence Upload & Extraction
- `/dashboard` – Candidate AI Command Workspace
- `/history` – Mock Session History Log
- `/settings` – Candidate Preference Center
- `/interview/[id]` – Live AI Probing Interview Session
- `/interview/[id]/report` – Executive Hiring Committee Evaluation Report
