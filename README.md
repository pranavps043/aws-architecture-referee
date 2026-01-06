# AWS Architecture Referee ⚖️
> **Stop reading docs. Start making decisions.**  
> An interactive tool to compare AWS services, analyze trade-offs, and get tailored architectural recommendations.
![Project Banner](https://img.shields.io/badge/Status-Complete-success) ![Tech](https://img.shields.io/badge/Built%20With-Next.js%2016-black) ![Style](https://img.shields.io/badge/Style-Tailwind%20v4-blue)
## 🚀 Overview
**AWS Architecture Referee** is a Next.js application designed to solve "Analysis Paralysis" for cloud architects. Instead of drowning you in documentation, "The Referee" provides:
1.  **Side-by-Side Comparisons**: Clear, structured tradeoffs between competing services (e.g., Lambda vs. EC2).
2.  **Opinionated Verdicts**: A definitive "Referee's Call" on when to use which service.
3.  **Smart Referee (AI-like Logic)**: An interactive wizard that takes your constraints (Traffic, Budget, Ops) and calculates the perfect architectural match.
## ✨ Key Features
- **⚔️ Comparison Engine**: Compare services on Cost, Scalability, Maintenance, and Performance.
- **🤖 Smart Referee**: Interactive recommendation wizard (`/recommend`).
- **🏆 Winner Highlights**: See which service wins in specific dimensions (e.g., "Winner: Lambda" for Scalability).
- **🎨 Premium UI**: A modern, dark-mode-first aesthetic built with **Tailwind CSS v4**.
- **⚡ High Performance**: Built on Next.js 16 App Router for instant page loads.
## 🛠️ Tech Stack
- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (configured with CSS variables)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom UI components (Cards, Badges, Buttons) using `cva` and `clsx`.
## 🏃‍♂️ Getting Started
1.  **Clone the repository**
    ```bash
    git clone https://github.com/StartCompass/aws-architecture-referee.git
    cd aws-architecture-referee
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run the development server**
    ```bash
    npm run dev
    ```
4.  **Open the app**
    Navigate to `http://localhost:3000` (or `3001` if 3000 is taken).
## 📂 Project Structure
```text
.
├── .kiro/                  # Compliance & Project Logs
├── src/
│   ├── app/                # Next.js Pages (Compare, Recommend, Home)
│   ├── components/         # Reusable UI Components
│   └── data/               # Static comparison data & logic
├── public/                 # Static assets
└── ...config files         # Next.js, Tailwind, ESLint configs
```
## 🧠 Smart Referee Logic
The recommendation engine isn't just a simple if/else. It uses a **weighted attribute scoring system**:
- **Input**: User defines Traffic (Spiky/Consistent), Budget (Low/High), Ops Effort, and Workload.
- **Data**: Each service has attributes mapped in `src/data/comparisons.ts`.
- **Algorithm**: The engine calculates a compatibility score (3pts for primary data match, 2pts for secondary) to recommend the mathematically best fit.
