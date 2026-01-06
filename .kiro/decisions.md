# Architectural Design Decisions

## 1. Framework Selection

**Decision**: Next.js 16 (App Router)
**Context**: Need a modern, performant web framework that supports React Server Components and easy dynamic routing for comparisons.
**Status**: Accepted.

## 2. Styling Strategy

**Decision**: Tailwind CSS v4
**Context**: Requirement for a "Premium" and "Dark Mode" aesthetic. Tailwind provides rapid styling capabilities with a variable-based theme (zinc/slate/blue) defined in `globals.css`.
**Status**: Accepted.

## 3. Data Storage

**Decision**: Static TypeScript Data (`src/data/comparisons.ts`)
**Context**: For a prototype/hackathon submission, a full database adds overhead. Storing comparison data in a structured TypeScript file enables type safety, easy editing, and zero-latency access during the demo.
**Status**: Accepted.

## 4. Recommendation Engine Logic

**Decision**: Weighted Attribute Scoring (Client-Side)
**Context**: The "Smart Referee" needs to provide instant feedback. We implemented a scoring algorithm in `RecommendationWizard.tsx` that matches user constraints (Traffic, Budget, Ops, Workload) against service attributes with weighted points (e.g., specific traffic match = 3 points).
**Status**: Accepted.
