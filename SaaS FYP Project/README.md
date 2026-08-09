# 🏥 Smart Clinic & Pharmacy Management SaaS

> **BSIT Final Year Project** — A modern SaaS platform for small clinics and pharmacies in Sanghar, Pakistan, and similar cities transitioning from manual record keeping to digital operations.

---

## 📋 Overview

This system automates the full operational workflow of a local healthcare facility:

- **Patient Management** — digital records, medical history, search
- **Appointment Scheduling** — calendar, bookings, statuses
- **Billing** — invoices, payments, revenue tracking
- **Pharmacy Inventory** — stock, expiry alerts, suppliers, sales
- **Reports & Analytics** — daily/monthly, charts, PDF & CSV export
- **User Management** — role-based access control
- **AI Administrative Assistant** — summaries, insights, forecasting, natural language search

> ⚠️ **AI Safety Policy:** This system performs **administrative** tasks only. It does **NOT** provide medical diagnosis or treatment advice.

---

## 🛠️ Technology Stack

| Layer          | Technology                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**   | React (Vite), Tailwind CSS, React Router, Framer Motion, React Icons, Recharts + Chart.js, React Hook Form, React Three Fiber |
| **Backend**    | Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary (optional)                                            |
| **AI**         | OpenAI API                                                                                                                    |
| **Deployment** | Vercel (frontend), Render (backend), MongoDB Atlas (database)                                                                 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **20+** (developed on v26)
- npm **10+**
- MongoDB (local or Atlas)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
# Backend
cp backend/.env.example backend/.env
# edit backend/.env — set MONGO_URI, JWT_SECRET

# Frontend
cp frontend/.env.example frontend/.env
# edit frontend/.env — set VITE_API_URL
```

### 3. Run development servers

```bash
# Both (backend :5000 + frontend :5173)
npm run dev

# Or individually
npm run dev:backend
npm run dev:frontend
```

### 4. Seed demo data (optional)

```bash
npm run seed
```

### Default seed accounts

| Role         | Email                | Password      |
| ------------ | -------------------- | ------------- |
| Admin        | admin@clinic.com     | Admin@123     |
| Doctor       | doctor@clinic.com    | Doctor@123    |
| Receptionist | reception@clinic.com | Reception@123 |
| Pharmacist   | pharmacy@clinic.com  | Pharmacy@123  |

---

## 📁 Repository Structure

```
SaaS FYP Project/
├── backend/                 # REST API
│   └── src/
│       ├── config/          # DB, env, cloudinary config
│       ├── controllers/     # Request handlers
│       ├── middlewares/     # Auth, RBAC, validation, errors
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express routers (v1)
│       ├── services/        # AI, reports, business logic
│       ├── utils/           # Helpers & formatters
│       ├── seeders/         # Demo data
│       └── server.js        # Entry
├── frontend/                # React SPA
│   └── src/
│       ├── api/             # Axios client + modules
│       ├── components/      # Reusable UI & charts
│       ├── context/         # Auth / Theme / Toast
│       ├── hooks/           # Custom hooks
│       ├── layouts/         # Dashboard & Auth layouts
│       ├── pages/           # Route pages
│       ├── routes/          # Protected routing
│       └── utils/           # Formatters & validators
├── .gitignore
├── package.json             # Root (workspaces + scripts)
└── README.md
```

---

## 🔐 Roles & Access

| Module           | Admin | Doctor | Receptionist | Pharmacist |
| ---------------- | :---: | :----: | :----------: | :--------: |
| Dashboard        |  ✅   |   ✅   |      ✅      |     ✅     |
| Patients         |  ✅   |   ✅   |      ✅      |     —      |
| Appointments     |  ✅   |   ✅   |      ✅      |     —      |
| Billing          |  ✅   |   —    |      ✅      |     —      |
| Pharmacy         |  ✅   |   —    |      —       |     ✅     |
| Reports          |  ✅   |   ✅   |      ✅      |     ✅     |
| Users / Settings |  ✅   |   —    |      —       |     —      |

---

## 🧩 Modules

| #   | Module             | Highlights                                                           |
| --- | ------------------ | -------------------------------------------------------------------- |
| 1   | **Authentication** | JWT (httpOnly cookie), bcrypt, role-based login                      |
| 2   | **Landing Page**   | Premium hero with React Three Fiber 3D, glassmorphism                |
| 3   | **Dashboard**      | KPI cards, charts, role-aware navigation, dark mode                  |
| 4   | **Patients**       | CRUD, medical history, search, pagination                            |
| 5   | **Appointments**   | Calendar, statuses, today's queue                                    |
| 6   | **Billing**        | Invoices, payments, print, revenue dashboard                         |
| 7   | **Pharmacy**       | Inventory, categories, expiry/low-stock alerts, suppliers, sales     |
| 8   | **Analytics**      | Recharts/Chart.js — revenue, appointments, patients, meds            |
| 9   | **Reports**        | Daily/monthly summaries, PDF & CSV export                            |
| 10  | **Settings**       | Clinic profile, user management, password change                     |
| 11  | **AI Assistant**   | Visit summaries, report generation, insights, forecasting, NL search |

---

## 🎨 UI / UX Design Language

- Minimalist, premium SaaS aesthetic
- Glassmorphism with soft shadows and rounded cards
- Blue + white healthcare palette
- Full dark mode (class strategy)
- Smooth Framer Motion animations
- Professional Inter typography
- Fully responsive (mobile → desktop)
- 3D hero on landing only — dashboards stay light & fast

---

## 📦 Deployment

### Frontend — Vercel

1. Push repo to GitHub
2. Import project into Vercel
3. Root: `frontend`, build: `npm run build`, output: `dist`
4. Add env var: `VITE_API_URL=https://<backend>.onrender.com/api/v1`

### Backend — Render

1. Create new **Web Service** → connect repo
2. Root: `backend`, start: `npm start`
3. Add env vars from `backend/.env.example`
4. Use **MongoDB Atlas** connection string

---

## 🧠 AI Safety & Ethics

The AI module is bounded to **administrative** assistance:

- ✅ Patient visit summaries (non-clinical)
- ✅ Automated daily report drafts
- ✅ Inventory consumption forecasting
- ✅ Sales trend analysis
- ✅ Natural language search across records
- ✅ Operational recommendations

- ❌ Never medical diagnosis
- ❌ Never treatment plans
- ❌ Never medication prescriptions

---

## 🧑‍💻 Development Approach

Built step-by-step with production practices:

- Clean architecture (controllers / routes / models / services / middlewares / utils)
- Reusable components + custom hooks
- Form validation everywhere (React Hook Form)
- Full loading/error/empty states
- Comprehensive error handling (Express middleware)
- Security-first (Helmet, rate limiting, CORS whitelist, JWT)
- QA-ready: seed data, consistent API patterns, thorough READMEs

---

## 📄 License

Academic project — for BSIT Final Year Project presentation & demonstration.
