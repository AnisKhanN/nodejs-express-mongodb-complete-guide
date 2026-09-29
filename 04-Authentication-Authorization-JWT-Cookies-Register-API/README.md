# 🔐 Authentication, Authorization, JWT, Cookies & Register API

A beginner-friendly backend project built while learning **Node.js**, **Express.js**, and **MongoDB**. This project focuses on implementing secure user authentication and authorization using **JWT (JSON Web Token)**, **HTTP Cookies**, and a **Register API**.

This folder is part of my **Node.js, Express.js & MongoDB Learning Journey (2026)**.

---

## 📚 Topics Covered

- Authentication vs Authorization
- JWT (JSON Web Tokens)
- HTTP Cookies
- Register API
- Login API
- Password Hashing (bcrypt)
- Token-Based Authentication
- Protected Routes
- Express Middleware
- Express Validator
- MongoDB User Model
- Environment Variables
- Error Handling
- Testing APIs with Postman

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (jsonwebtoken)
- bcrypt

### Validation

- Express Validator

### Development Tools

- Nodemon
- dotenv
- Postman

---

## 📁 Project Structure

```text
04-Authentication-Authorization-JWT-Cookies-Register-API/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── auth.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── validator.middleware.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── auth.routes.js
│
├── utils/
│   └── generateToken.js
│
├── app.js
├── server.js
├── package.json
├── .env
└── README.md
```

---

## 🚀 Features

- User Registration
- User Login
- Password Hashing
- JWT Generation
- Cookie-Based Authentication
- Protected Routes
- Authentication Middleware
- Input Validation
- Secure Environment Variables
- MongoDB Integration

---

## 🔑 Authentication Flow

```text
User
   │
   ▼
Register API
   │
   ▼
Password Hashing (bcrypt)
   │
   ▼
Store User in MongoDB
   │
   ▼
Login API
   │
   ▼
Generate JWT Token
   │
   ▼
Store Token in Cookie
   │
   ▼
Protected Route
   │
   ▼
Middleware Verifies JWT
   │
   ▼
Access Granted ✅
```

---

## 📦 Packages Used

```bash
npm install express
npm install mongoose
npm install bcrypt
npm install jsonwebtoken
npm install cookie-parser
npm install dotenv
npm install express-validator
npm install cors

npm install --save-dev nodemon
```

---

## 🌍 Environment Variables

Create a **.env** file.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

---

## ▶️ Run the Project

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

or

```bash
nodemon server.js
```

---

## 🧪 API Endpoints

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register a new user |
| POST   | /login    | Login user          |
| POST   | /logout   | Logout user         |
| GET    | /profile  | Protected Route     |

---

## 📖 Learning Objectives

By completing this project, I learned:

- Difference between Authentication & Authorization
- How JWT works
- Why Tokens are used
- Password Hashing using bcrypt
- Cookie-Based Authentication
- Creating Register & Login APIs
- Protecting Routes with Middleware
- Using Express Validator
- Managing Environment Variables
- Working with MongoDB User Collections

---

## 📌 Future Improvements

- Refresh Tokens
- Role-Based Authorization
- Email Verification
- Forgot Password
- Reset Password
- OAuth Authentication
- Rate Limiting
- Unit Testing with Jest
- API Documentation using Swagger

---

## 👨‍💻 Author

**[Anis Khan Niazi](https://github.com/AnisKhanN)**

Backend Development Learning Journey (2026)
