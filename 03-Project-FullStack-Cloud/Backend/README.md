# Backend

This folder contains the backend of the Full-Stack Cloud Project. It is built using **Node.js** and **Express.js** and provides RESTful APIs for handling application logic, image uploads, and communication with the frontend.

---

# 🚀 Features

- Express.js Server
- RESTful API Development
- CRUD Operations
- Image Upload Handling
- Middleware
- Error Handling
- JSON Responses
- Environment Variables
- Frontend Integration

---

# 🛠 Technologies Used

- Node.js
- Express.js
- JavaScript (ES6+)
- ImageKit (Cloud Storage)
- REST APIs
- dotenv
- Multer
- CORS

---

# 📂 Folder Structure

```text
Backend/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── utils/
├── app.js
├── package.json
├── .env
└── README.md
```

---

# 📖 API Endpoints

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | `/posts`       | Retrieve all posts           |
| POST   | `/create-post` | Create a new post with image |
| DELETE | `/posts/:id`   | Delete a post                |

> Additional endpoints may be added as the project grows.

---

# ⚙️ Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

or

```bash
node app.js
```

---

# 🔐 Environment Variables

Create a `.env` file and configure the required environment variables.

Example:

```env
PORT=3000

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

# 🎯 Learning Objectives

- Build REST APIs
- Understand Express.js routing
- Handle HTTP requests and responses
- Upload images to cloud storage
- Connect backend with frontend
- Practice backend architecture

---

# 👨‍💻 Author

**[Anis Khan Niazi](https://github.com/AnisKhanN)**

Backend Development Learning Journey (2026)
