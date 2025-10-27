# Protocore Expenses (V2) — Vite + React + Firebase

## 1) Install
```bash
npm i
```

## 2) Environment
Create `.env` in project root (already included here). For Vercel, set the same keys in **Project → Settings → Environment Variables** (prefix with `VITE_` exactly).

## 3) Firebase
- Enable **Authentication → Google** (done in Console) and press **Save**.
- Create Firestore in **production** or **test** mode.
- (Optional) Add security rules so each user only sees their docs:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{docId} {
      allow read, create: if request.auth != null && request.auth.uid == resource.data.uid;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

## 4) Run locally
```bash
npm run dev
```

## 5) Deploy to Vercel
- Push to GitHub.
- Import the repo in Vercel.
- **Framework Preset:** Vite
- **Build Command:** `vite build`
- **Output Directory:** `dist`
- Add env vars in Vercel (same as `.env`), then redeploy.

## Notes
- Google sign-in uses `signInWithPopup` (no web client ID needed).
- Firestore collection used: `expenses`.
