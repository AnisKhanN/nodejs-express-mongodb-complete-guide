# 🏥 Smart Clinic & Pharmacy SaaS — Frontend

Premium React dashboard for the Smart Clinic & Pharmacy Management SaaS.

## 🚀 Quick Start

```bash
# 1. Install dependencies (from repo root)
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start in development mode (from repo root)
npm run dev:frontend
```

## 🧰 Tech Stack

- React 18 + Vite 6
- Tailwind CSS (glassmorphism, dark mode)
- React Router v6
- Framer Motion (animations)
- Recharts + Chart.js (analytics)
- React Hook Form (validated forms)
- React Three Fiber (landing hero only)
- Axios (API client)

## 🗂️ Architecture

```
frontend/
├── public/
├── src/
│   ├── api/            # Axios instance, API modules
│   ├── assets/         # Images, fonts, CSS
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Button, Card, Modal, Table, etc.
│   │   └── charts/     # Reusable chart components
│   ├── context/        # Auth, Theme, Toast contexts
│   ├── hooks/          # useAuth, useTheme, custom hooks
│   ├── layouts/        # DashboardLayout, AuthLayout
│   ├── pages/          # Route pages
│   ├── routes/         # AppRouter, ProtectedRoute
│   ├── utils/          # Formatters, validators
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
└── package.json
```

## 🎨 UI Design System

- **Palette:** Healthcare blue + white, soft grays
- **Effects:** Glassmorphism, soft shadows, rounded cards
- **Typography:** Inter (professional)
- **Dark Mode:** Class-based Tailwind strategy
- **Animations:** Framer Motion (page transitions, hover, modals)
- **Responsive:** Mobile-first, all modules fully responsive

## 🔑 Roles

The dashboard adapts navigation and permissions per role:

- **Admin** — everything
- **Doctor** — patients, appointments, medical history
- **Receptionist** — patients, appointments, billing
- **Pharmacist** — pharmacy, inventory, sales, reports

## 📦 Deployment

Designed for Vercel. Set `VITE_API_URL` to your Render backend URL. See root README for full guide.
