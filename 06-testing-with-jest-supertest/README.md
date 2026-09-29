# 🧪 Testing with Jest & Supertest

A beginner-friendly backend testing project created while learning how to test **Node.js and Express.js APIs** using **Jest** and **Supertest**.

This project also includes basic request validation using **Express Validator**.

It is part of my **Node.js, Express.js & MongoDB Learning Journey**.

---

## 📚 Project Overview

The main purpose of this project is to understand how automated tests can be written for an Express.js application without manually testing every request through Postman.

The project currently contains:

- An Express.js application
- Basic REST API endpoints
- Express Validator middleware
- Jest testing
- Supertest HTTP testing
- A basic automated test for the root endpoint

---

## 🎯 Learning Objectives

Through this project, I am learning:

- Why backend testing is important
- How Jest works
- How Supertest works
- How to test Express.js APIs
- How to test HTTP status codes
- How to test JSON responses
- How to import an Express app into a test
- How middleware affects API requests
- How Express Validator validates request data
- How automated tests can help prevent regressions

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- JavaScript
- CommonJS

### Testing

- Jest
- Supertest

### Validation

- Express Validator

### Development

- Nodemon
- Postman
- Visual Studio Code
- Git
- GitHub

---

## 📦 Dependencies

The project currently uses:

```text
express
express-validator
jest
supertest
```

---

## 📁 Project Structure

```text
06-testing-with-jest-supertest/
│
├── src/
│   ├── app.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── ValidationMiddleware.js
│   │
│   └── test/
│       └── test.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

> `node_modules/` is intentionally excluded from GitHub and can be recreated using `npm install`.

---

# 🚀 Express.js Application

The Express application is defined in:

```text
src/app.js
```

The application uses:

```javascript
app.use(express.json());
```

to parse JSON request bodies.

The Express application is exported:

```javascript
module.exports = app;
```

This is important because the test file can import the app directly without starting a separate HTTP server.

---

# 🌐 API Endpoints

The current application contains the following endpoints:

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/` | Welcome message | `200` |
| POST | `/register` | Register user | `201` |
| POST | `/login` | Login user | `200` |
| POST | `/logout` | Logout user | `200` |

---

## 🏠 GET `/`

Returns:

```json
{
  "message": "Welcome to the Task Management API"
}
```

Expected HTTP status:

```text
200 OK
```

---

## 👤 POST `/register`

The registration endpoint receives:

```text
username
email
password
confirmPassword
avatar
```

The endpoint currently returns a successful registration response when the request passes its validation.

Expected HTTP status:

```text
201 Created
```

---

## 🔑 POST `/login`

The login endpoint receives:

```text
email
password
```

Expected HTTP status:

```text
200 OK
```

---

## 🚪 POST `/logout`

The logout endpoint currently returns a successful logout response.

Expected HTTP status:

```text
200 OK
```

---

# ✅ Express Validator

The project uses **Express Validator** for validating registration requests.

Validation rules currently include:

### Username

- Must be a string
- Cannot be empty
- Must contain between 3 and 20 characters

### Email

- Must be a valid email
- Cannot be empty
- Maximum length is 50 characters

### Password

- Must contain at least 6 characters
- Cannot be empty

### Confirm Password

- Cannot be empty
- Must match the password

### Avatar

The current validation expects an uploaded file to exist as:

```javascript
req.file
```

---

## Validation Error Response

When validation fails, the middleware returns:

```json
{
  "errors": [
    {
      "msg": "Validation error"
    }
  ]
}
```

with:

```text
400 Bad Request
```

---

# 🧪 Jest

**Jest** is used as the testing framework.

Jest provides features such as:

- Test suites
- Test cases
- Assertions
- Setup and teardown
- Test reporting

A basic Jest test looks like:

```javascript
describe("GET /", () => {
    it("it should return 200 OK", async () => {
        // test
    });
});
```

---

# 🚀 Supertest

**Supertest** is used to send HTTP requests to the Express application during testing.

Example:

```javascript
const response = await request(app)
    .get("/")
    .expect(200);
```

This allows the API to be tested without manually opening Postman.

---

# 🔬 Current Automated Test

The current test is located at:

```text
src/test/test.js
```

It tests:

```text
GET /
```

The test verifies:

### HTTP Status

```javascript
expect(response.statusCode).toBe(200);
```

### JSON Response

```javascript
expect(response.body).toEqual({
    message: "Welcome to the Task Management API"
});
```

The test confirms that the root endpoint returns the expected response.

---

# 🔄 Testing Flow

The current testing flow is:

```text
Jest
  │
  ▼
Supertest
  │
  ▼
Express Application
  │
  ▼
GET /
  │
  ▼
Route Handler
  │
  ▼
HTTP 200 Response
  │
  ▼
Jest Assertions
  │
  ▼
Test Passed ✅
```

---

# 📦 Installation

## 1. Install Dependencies

From the project folder:

```bash
npm install
```

This installs the dependencies defined in:

```text
package.json
```

---

## 2. Start the Development Server

The project provides:

```bash
npm run dev
```

This starts the server using Nodemon.

---

## 3. Start Normally

```bash
npm start
```

The server listens on:

```text
http://localhost:3000
```

---

# 🧪 Run Tests

The project uses Jest, so tests can be run with:

```bash
npx jest
```

For a more detailed test output:

```bash
npx jest --verbose
```

To run Jest in watch mode:

```bash
npx jest --watch
```

> The current `package.json` does not define a dedicated `test` script, so `npx jest` is used directly.

---

# 📊 Expected Test Result

When the current test passes, Jest should report a successful test suite similar to:

```text
PASS  src/test/test.js

✓ it should return 200 OK
```

The exact output may vary depending on the installed Jest version and terminal.

---

# 🧠 Important Testing Concept

The application is separated into:

```text
server.js
```

and:

```text
src/app.js
```

### `server.js`

Starts the actual HTTP server:

```javascript
const app = require("./src/app");

app.listen(3000, () => {
    console.log("Server is running on port https://localhost:3000");
});
```

### `src/app.js`

Creates and exports the Express application:

```javascript
module.exports = app;
```

This separation makes testing easier because Supertest can use:

```javascript
const app = require("../app");
```

without needing to start the server separately.

---

# 🗂️ Project Architecture

```text
Client / Test
     │
     ▼
Supertest
     │
     ▼
Express App
     │
     ├── Routes
     │
     ├── Middleware
     │      └── Express Validator
     │
     └── Controllers / Handlers
     │
     ▼
HTTP Response
     │
     ▼
Jest Assertions
```

---

# 📈 Learning Progress

- [x] Express.js Application
- [x] Express JSON Middleware
- [x] REST API Endpoints
- [x] Express Validator
- [x] Jest Installation
- [x] Supertest Installation
- [x] Import Express App into Tests
- [x] Test HTTP Status Code
- [x] Test JSON Response
- [ ] Test Registration API
- [ ] Test Login API
- [ ] Test Logout API
- [ ] Test Validation Errors
- [ ] Test Protected Routes
- [ ] Database Testing
- [ ] Jest Setup & Teardown
- [ ] Mocking
- [ ] More Comprehensive API Test Suite

---

# 🔮 Future Improvements

As I continue learning testing, I plan to add tests for:

- Registration success
- Registration validation failures
- Invalid email
- Short passwords
- Password confirmation mismatch
- Login success
- Invalid login credentials
- Logout
- Authentication middleware
- Protected routes
- Database operations
- Error handling
- Multiple API scenarios

I also plan to add a dedicated test script to `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Then tests can be run with:

```bash
npm test
```

---

# ⚠️ Security & Git Notes

Do not upload:

```text
node_modules/
.env
*.log
```

Your `.gitignore` should include:

```gitignore
node_modules/
.env
*.log
```

The `.env` file may contain sensitive information and should remain local.

---

# 📤 Upload to GitHub

This project is part of my main repository:

```text
nodejs-express-mongodb-learning
```

Therefore, **do not run `git init` inside this folder**.

There should only be one Git repository at the root:

```text
nodejs-express-mongodb-learning/
└── .git/
```

---

## 1. Go to the Main Repository

From the terminal:

```bash
cd D:\nodejs-express-mongodb-learning
```

Use your actual repository path if it is different.

---

## 2. Check Git Status

```bash
git status
```

---

## 3. Add the Project

```bash
git add "06-testing-with-jest-supertest"
```

---

## 4. Check Staged Files

```bash
git status
```

Make sure you are not staging:

```text
.env
node_modules/
```

---

## 5. Commit

For the initial project:

```bash
git commit -m "feat: add Jest and Supertest testing project"
```

---

## 6. Push

```bash
git push origin main
```

---

# 🔄 Updating the Project Later

After making changes:

```bash
git status
```

```bash
git add "06-testing-with-jest-supertest"
```

```bash
git commit -m "test: add API tests with Jest and Supertest"
```

```bash
git push origin main
```

For README-only changes:

```bash
git add "06-testing-with-jest-supertest/README.md"
```

```bash
git commit -m "docs: update Jest and Supertest README"
```

```bash
git push origin main
```

---

# 📌 Project Status

🚧 **In Progress**

This project is currently focused on learning automated backend testing with **Jest** and **Supertest**, together with Express API validation.

---

# 📚 Part of My Learning Journey

This project is part of my larger repository:

```text
nodejs-express-mongodb-learning
```

My backend learning progression includes:

```text
Node.js
   ↓
Express.js
   ↓
REST APIs
   ↓
MongoDB
   ↓
Authentication
   ↓
JWT
   ↓
Cookies
   ↓
Middleware
   ↓
API Validation
   ↓
Jest & Supertest
   ↓
Automated API Testing
```

---

## 👨‍💻 Author

**[Anis Khan Niazi](https://github.com/AnisKhanN)**

Node.js, Express.js & MongoDB Learning Journey — 2026

---

⭐ **Learning by building, testing, debugging, and improving.**
