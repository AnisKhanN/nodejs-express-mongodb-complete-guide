# 🏥 Smart Clinic & Pharmacy SaaS — Backend API

Production-grade REST API for the Smart Clinic & Pharmacy Management SaaS.

## 🚀 Quick Start

```bash
# 1. Install dependencies (from repo root)
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start in development mode (from repo root)
npm run dev:backend
```

## 🧪 Default Seed Accounts

Run `npm run seed` to populate the database with demo data.

| Role         | Email                | Password      |
| ------------ | -------------------- | ------------- |
| Admin        | admin@clinic.com     | Admin@123     |
| Doctor       | doctor@clinic.com    | Doctor@123    |
| Receptionist | reception@clinic.com | Reception@123 |
| Pharmacist   | pharmacy@clinic.com  | Pharmacy@123  |

## 🗂️ Architecture

```
backend/
├── src/
│   ├── config/         # Configuration (db, env, cloudinary)
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Auth, error, validation, RBAC
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   ├── services/       # Business logic (AI, reports, exports)
│   ├── utils/          # Helpers, API responses, pagination
│   ├── validators/     # Express-validator schemas
│   ├── seeders/        # Demo data
│   └── server.js       # Entry point
├── .env.example
└── package.json
```

## 🔒 Security

- JWT (httpOnly cookie) authentication
- bcrypt password hashing
- Helmet security headers
- CORS whitelist
- Express rate limiting
- Role-based access control (Admin / Doctor / Receptionist / Pharmacist)

## 📚 API Prefix

All routes are prefixed with **`/api/v1`**.

| Module       | Base Path              |
| ------------ | ---------------------- |
| Auth         | `/api/v1/auth`         |
| Users        | `/api/v1/users`        |
| Patients     | `/api/v1/patients`     |
| Appointments | `/api/v1/appointments` |
| Billing      | `/api/v1/billing`      |
| Pharmacy     | `/api/v1/pharmacy`     |
| Reports      | `/api/v1/reports`      |
| AI           | `/api/v1/ai`           |
| Settings     | `/api/v1/settings`     |

## 🧠 AI Safety Policy

The AI module is strictly **administrative only**:

- ✅ Patient visit summaries
- ✅ Daily report generation
- ✅ Inventory insights & forecasting
- ✅ Sales analysis
- ✅ Natural language search
- ✅ Administrative recommendations

- ❌ **Never** provides medical diagnosis
- ❌ Never suggests treatment plans

## 📦 Deployment

Designed for Render (backend) + MongoDB Atlas. See root README for full deployment guide.
