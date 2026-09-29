# Creating Notes APIs & Testing with Postman

This project focuses on building a simple **Notes REST API** using **Node.js** and **Express.js**, and testing its endpoints with **Postman**.

The goal is to understand how REST APIs work by implementing CRUD (Create, Read, Update, Delete) operations and verifying each endpoint through API testing.

---

## 📚 Topics Covered

### REST API Development

- Creating a Notes API
- RESTful API Design
- API Endpoints
- Request & Response Cycle

### CRUD Operations

- Create a New Note
- Read All Notes
- Read a Single Note
- Update an Existing Note
- Delete a Note

### Express.js Concepts

- Express Routing
- Route Parameters
- Request Body
- JSON Responses
- Status Codes
- Error Handling

### Postman

- Creating API Requests
- Testing GET Requests
- Testing POST Requests
- Testing PUT Requests
- Testing DELETE Requests
- Sending JSON Data
- Inspecting API Responses

---

## 🛠 Technologies Used

- Node.js
- Express.js
- JavaScript (ES6+)
- Postman
- REST APIs
- JSON

---

## 📂 API Endpoints

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/notes`     | Retrieve all notes       |
| GET    | `/notes/:id` | Retrieve a specific note |
| POST   | `/notes`     | Create a new note        |
| PUT    | `/notes/:id` | Update an existing note  |
| DELETE | `/notes/:id` | Delete a note            |

---

## 🎯 Learning Objectives

By completing this project, I aim to:

- Understand REST API architecture.
- Build CRUD APIs using Express.js.
- Learn how HTTP methods work.
- Send and receive JSON data.
- Test APIs using Postman.
- Interpret HTTP status codes.
- Improve backend development skills.

---

## 📂 Project Structure

```text
Creating Notes APIs & Testing with Postman/
│
├── app.js
├── package.json
├── package-lock.json
├── routes/
├── controllers/
├── README.md
└── ...
```

> The project structure may evolve as new features and concepts are added.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in this directory based on `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/notesDB
```

### 3. Start the Server

```bash
npm start
```

or directly:

```bash
node server.js
```

or with auto-reload (Nodemon):

```bash
npm run dev
```

---

## 🧪 Testing with Postman

After starting the server:

1. Open Postman.
2. Create a new request.
3. Select the appropriate HTTP method (`GET`, `POST`, `PATCH`, `DELETE`).
4. Enter the API endpoint URL (e.g., `http://localhost:3000/notes`).
5. For `POST` and `PATCH`, provide a JSON body:
   ```json
   {
     "title": "Study Plan",
     "description": "Revise Node.js and MongoDB fundamentals"
   }
   ```
6. Send the request and verify response and status code.

---

## 📈 Learning Progress

- [x] Create Express Server
- [x] Create Notes API
- [x] Implement CRUD Operations
- [x] Handle JSON Requests
- [x] Test APIs with Postman
- [x] Understand HTTP Methods
- [x] Add Persistent Database (MongoDB & Mongoose)
- [ ] Implement Validation Middleware
- [ ] Add Authentication & Authorization
- [ ] Deploy API to Cloud

---

## 📝 Notes

This project is part of my **Backend Development Learning Journey**, where I am building practical projects to strengthen my understanding of Node.js, Express.js, REST APIs, and API testing.

---

## 👨‍💻 Author

**[Anis Khan Niazi](https://github.com/AnisKhanN)**

Backend Development Learning Journey (2026)
