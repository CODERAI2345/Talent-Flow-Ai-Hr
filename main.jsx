# TalentFlow AI 🚀

> AI-powered career intelligence platform for engineers, PMs, and founders.

![TalentFlow AI](https://img.shields.io/badge/React-18-blue?logo=react)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet%204-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

| Section | Description |
|---|---|
| 🏠 **Home** | Hero carousel, animated canvas sections, counters |
| 🏢 **Companies** | Spotify-style cards, Clearbit logos, AI auto-fill |
| 🚀 **Startups** | Stage/equity/tech tracking with world banner |
| 🤖 **AI Tools** | Curated AI toolkit with categories & pricing |
| 📜 **Certifications** | Market demand rings, provider info |
| 📄 **Resume Models** | ATS score badges, template tips |
| 🗺️ **Career Path** | Milestone roadmaps with salary jump info |
| 🌐 **Networking** | LinkedIn-powered professional search (India + Global) |
| 💼 **Job Search** | AI-generated job listings, India-aware |
| 💰 **Salary Calc** | INR/USD market benchmarking with Claude AI |
| 📊 **Skill Gap** | Gap analysis with learning path |
| ✅ **ATS Checker** | Resume scoring with 30+ metrics |
| ⚙️ **Admin Portal** | Hidden admin gate (password protected) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
talentflow-ai/
├── public/              # Static assets
├── src/
│   ├── api/             # Claude API helper
│   ├── assets/          # Images & media
│   ├── components/
│   │   ├── admin/       # Admin portal
│   │   ├── companies/   # Company cards & modals
│   │   ├── home/        # Homepage & canvas sections
│   │   ├── networking/  # Networking hub & canvas banner
│   │   ├── shared/      # Reusable components
│   │   ├── startups/    # Startups section
│   │   └── tools/       # ATS, Salary, Skill Gap, Jobs, Certs
│   ├── config/          # Navigation & section config
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global CSS
│   └── utils/           # Storage & helpers
├── package.json
└── vite.config.js
```

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **Claude Sonnet API** — AI features (job search, salary, skill gap, ATS, auto-fill)
- **window.storage** — Shared persistent data across all users
- **Clearbit API** — Company logo fetching

## Admin Access

Click the ⭐ in the topbar **5 times within 3 seconds** to open the admin gate.

## License

MIT
