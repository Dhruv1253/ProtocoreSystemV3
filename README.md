# Protocore Finance App (Login First)
- Vite + React + Tailwind
- Firebase Authentication (email/password) — **login required before dashboard**
- Cloud Firestore (realtime) — expenses stored under `orgs/protocore/transactions`
- Founders: Dhruv, Vishal, Shubham

## Setup
1) Copy `.env.example` → `.env` (keep values or replace with your Firebase project).
2) Enable **Email/Password** in Firebase Authentication.
3) Create users (Dhruv/Vishal/Shubham) in Firebase → Authentication.
4) Enable **Cloud Firestore** and publish secure rules (only authenticated users).

## Run
npm install
npm run dev

## Deploy (Vercel)
- Set the same VITE_FIREBASE_* env vars in Project Settings → Environment Variables.
- Build: `npm run build` ; Output: `dist`.
