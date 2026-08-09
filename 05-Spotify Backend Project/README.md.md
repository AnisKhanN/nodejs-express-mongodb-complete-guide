# 🎵 Spotify Backend Project

A backend-focused learning project inspired by the core functionality of a music streaming application.

This project is part of my **Node.js, Express.js & MongoDB Learning Journey**. It was built to practice backend concepts by creating authentication APIs, protected music and album APIs, MongoDB models, file uploads, and cloud storage integration.

> **Note:** This is an educational project created for learning and practice. It is not an official Spotify application.

---

## 📚 Project Overview

This project focuses on building a backend API for a music-streaming-style application.

The current implementation includes:

- User registration
- User login
- JWT authentication
- Cookie-based authentication
- User and artist authorization
- Protected routes
- Music upload
- Album creation
- Music and album retrieval
- MongoDB integration with Mongoose
- File upload handling with Multer
- Cloud file storage with ImageKit

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- JavaScript
- CommonJS

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Token (`jsonwebtoken`)
- `bcryptjs`
- HTTP cookies
- `cookie-parser`

### File Upload & Storage

- Multer
- ImageKit Node.js SDK

### Environment Configuration

- `dotenv`

### Development

- Nodemon
- Postman
- Git
- GitHub
- Visual Studio Code

---

## 📦 Main Dependencies

The project currently uses:

```text
@imagekit/nodejs
bcryptjs
cookie-parser
dotenv
express
jsonwebtoken
mongoose
multer
```

Development:

```text
nodemon
```

---

## 📁 Project Structure

```text
05-Spotify-Backend-Project/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── musicController.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── albumModel.js
│   │   ├── musicModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── musicRoutes.js
│   │
│   ├── services/
│   │   └── storageService.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

> `node_modules/` is intentionally excluded from the repository and should be recreated with `npm install`.

---

## 🔄 Application Architecture

The basic request flow is:

```text
Client
  │
  ▼
Express Route
  │
  ▼
Middleware
  │
  ├── Authentication
  └── File Upload
  │
  ▼
Controller
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Response
```

For uploaded music and album artwork:

```text
Client
  │
  ▼
Multer
  │
  ▼
Memory Buffer
  │
  ▼
ImageKit
  │
  ▼
Cloud File URL
  │
  ▼
MongoDB
```

---

# 🔐 Authentication

The project implements authentication using **JWT** and **HTTP cookies**.

### Registration Flow

```text
POST /api/auth/register
        │
        ▼
Receive username, email, password and role
        │
        ▼
Check whether user already exists
        │
        ▼
Hash password using bcryptjs
        │
        ▼
Save user in MongoDB
        │
        ▼
Generate JWT
        │
        ▼
Set JWT in HTTP-only cookie
```

### Login Flow

```text
POST /api/auth/login
        │
        ▼
Find user by username or email
        │
        ▼
Compare password using bcryptjs
        │
        ▼
Generate JWT
        │
        ▼
Set JWT in cookie
```

### Supported Roles

The user model currently supports:

```text
user
artist
```

Artist-protected routes use the JWT `role` value to authorize access.

---

# 🍪 JWT & Cookies

The JWT contains the authenticated user's:

- User ID
- Role

The token is stored in a cookie named:

```text
token
```

The authentication middleware can also read tokens from:

```text
Cookie
Authorization: Bearer <token>
x-auth-token
```

---

# 🛡️ Authorization Middleware

The project contains different authentication middleware functions:

### `userAuthMiddleware`

Protects routes that require an authenticated user.

### `artistAuthMiddleware`

Protects routes that require the authenticated user to have:

```text
role = artist
```

### `userOrArtistAuthMiddleware`

Allows either an authenticated user or artist to access the route.

---

# 👤 Authentication API

Base URL:

```text
http://localhost:3000/api/auth
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login a user |
| GET | `/api/auth/logout` | Logout the current user |

### Register

```http
POST /api/auth/register
```

Example JSON body:

```json
{
  "username": "anis",
  "email": "anis@example.com",
  "password": "Password123",
  "role": "user"
}
```

Supported roles:

```text
user
artist
```

---

### Login

```http
POST /api/auth/login
```

Login can use either a username or an email together with the password.

Example:

```json
{
  "email": "anis@example.com",
  "password": "Password123"
}
```

---

### Logout

```http
GET /api/auth/logout
```

The server clears the authentication cookie.

---

# 🎵 Music API

Base URL:

```text
http://localhost:3000/api/music
```

## Get All Music

```http
GET /api/music/
```

Authentication:

```text
User or Artist
```

The endpoint returns music records with artist information.

---

## Upload Music

```http
POST /api/music/upload
```

Authentication:

```text
Authenticated User
```

The request uses `multipart/form-data`.

Example fields:

```text
title = My Song
music = <audio file>
```

The uploaded file is processed by Multer and sent to ImageKit.

The resulting cloud URL is stored in MongoDB.

---

## Upload Music - Alternative Route

The project also provides:

```http
POST /api/music/upload/music
```

This uses the same music creation controller.

---

## Create Album

```http
POST /api/music/upload/album
```

Authentication:

```text
Artist
```

The request uses `multipart/form-data`.

The album requires:

- Album title
- Music IDs
- Album artwork

The artwork is uploaded to ImageKit and its URL is stored with the album.

---

## Get All Albums

```http
GET /api/music/albums
```

Authentication:

```text
User or Artist
```

The response includes album information, artist information, and associated music.

---

## Get Album by ID

```http
GET /api/music/albums/:id
```

Authentication:

```text
User or Artist
```

Example:

```text
GET /api/music/albums/64xxxxxxxxxxxxxxxxxxxxxx
```

---

# 🗄️ MongoDB Models

The project currently contains three main Mongoose models.

## User

```text
users
```

Fields include:

- `username`
- `email`
- `password`
- `role`

The password is hashed before being stored.

---

## Music

```text
musics
```

Fields include:

- `uri`
- `title`
- `artist`
- `album`
- `playCount`
- `isPublic`
- `isVerified`
- `isDeleted`
- `createdAt`
- `updatedAt`

---

## Album

```text
albums
```

Fields include:

- `title`
- `artwork`
- `musics`
- `artist`
- `playCount`
- `description`
- `isPublic`
- `isVerified`
- `isDeleted`
- `createdAt`
- `updatedAt`

---

# ☁️ ImageKit Integration

ImageKit is used as the cloud storage service for uploaded music files and album artwork.

The upload process is:

```text
File Upload
    │
    ▼
Multer Memory Storage
    │
    ▼
Buffer
    │
    ▼
ImageKit
    │
    ▼
Cloud URL
    │
    ▼
MongoDB
```

Uploaded files are stored in the ImageKit folder:

```text
spotify-music
```

The project stores the returned URL in the database rather than storing the uploaded file directly in MongoDB.

---

# 📤 File Upload

Multer is configured with memory storage:

```text
memoryStorage()
```

The upload middleware accepts flexible field names such as:

```text
music
file
audio
song
artwork
albumArt
```

The middleware then standardizes the selected uploaded file as:

```javascript
req.file
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Do **not** commit the real `.env` file to GitHub.

Use a `.env.example` file if you want to document the required variables:

```env
PORT=3000
MONGO_URI=
JWT_SECRET=
IMAGEKIT_PRIVATE_KEY=
```

---

# 🚀 Installation

## 1. Install Node.js

Make sure Node.js and npm are installed.

Check:

```bash
node -v
npm -v
```

---

## 2. Install Dependencies

From this project folder:

```bash
npm install
```

This recreates the `node_modules` folder from `package.json` and `package-lock.json`.

---

## 3. Configure Environment Variables

Create:

```text
.env
```

and add the required MongoDB, JWT, and ImageKit configuration.

---

## 4. Start the Development Server

```bash
npm run dev
```

The project uses Nodemon for development.

---

## 5. Start Normally

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

unless a different `PORT` is specified in `.env`.

---

# 🧪 Testing with Postman

Recommended testing order:

### 1. Register

```text
POST /api/auth/register
```

Create a user or artist.

### 2. Login

```text
POST /api/auth/login
```

Authenticate the account.

### 3. Test Authentication

Use the returned authentication cookie/token when testing protected endpoints.

### 4. Upload Music

```text
POST /api/music/upload
```

Send the request as `multipart/form-data`.

### 5. Create Album

```text
POST /api/music/upload/album
```

This requires artist authorization.

### 6. Retrieve Music

```text
GET /api/music/
```

### 7. Retrieve Albums

```text
GET /api/music/albums
```

### 8. Retrieve One Album

```text
GET /api/music/albums/:id
```

---

# 📊 API Summary

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/logout` | No | Logout user |
| GET | `/api/music/` | User / Artist | Get music |
| POST | `/api/music/upload` | User | Upload music |
| POST | `/api/music/upload/music` | User | Upload music |
| POST | `/api/music/upload/album` | Artist | Create album |
| GET | `/api/music/albums` | User / Artist | Get albums |
| GET | `/api/music/albums/:id` | User / Artist | Get album by ID |

---

# 🧠 Concepts Practiced

This project combines several backend concepts learned throughout my course:

- Node.js
- Express.js
- REST APIs
- Routing
- Controllers
- Middleware
- MongoDB
- Mongoose
- Authentication
- Authorization
- JWT
- Cookies
- Password Hashing
- Multer
- File Uploads
- Cloud Storage
- ImageKit
- Environment Variables
- API Testing with Postman

---

# 📈 Learning Progress

- [x] Express.js Server
- [x] REST API Fundamentals
- [x] MongoDB Connection
- [x] Mongoose Models
- [x] User Registration
- [x] User Login
- [x] Password Hashing
- [x] JWT Authentication
- [x] Cookie Authentication
- [x] User Authorization
- [x] Artist Authorization
- [x] Express Middleware
- [x] Multer File Uploads
- [x] ImageKit Cloud Storage
- [x] Music API
- [x] Album API
- [x] Postman Testing
- [ ] Advanced Validation
- [ ] Automated Testing with Jest & Supertest
- [ ] Deployment

---

# 🔮 Future Improvements

Possible future improvements include:

- Express Validator integration
- More robust request validation
- Refresh token implementation
- Role-based access control improvements
- Music deletion
- Music update
- Album update
- Album deletion
- Playlist functionality
- Music search
- Pagination
- Filtering
- Rate limiting
- Automated API tests
- Jest & Supertest
- API documentation
- Production deployment

---

# 📤 Upload to GitHub

This project belongs to the main repository:

```text
nodejs-express-mongodb-learning
```

Therefore, **do not run `git init` inside this project folder**.

There should be only one Git repository at:

```text
nodejs-express-mongodb-learning/
└── .git/
```

---

## Check Git Status

From the root of the main repository:

```bash
cd D:\nodejs-express-mongodb-learning
```

Then:

```bash
git status
```

---

## Add the Project

```bash
git add "05-Spotify Backend Project"
```

---

## Check What Will Be Committed

```bash
git status
```

Make sure `node_modules` and `.env` are not being staged.

---

## Commit

For the first version of the project:

```bash
git commit -m "feat: add Spotify backend learning project"
```

---

## Push

```bash
git push origin main
```

---

# 🔄 Future Updates

After making changes:

```bash
git status
```

```bash
git add "05-Spotify Backend Project"
```

```bash
git commit -m "feat: update Spotify backend project"
```

```bash
git push origin main
```

For README-only changes:

```bash
git add "05-Spotify Backend Project/README.md"
```

```bash
git commit -m "docs: update Spotify backend README"
```

```bash
git push origin main
```

---

# ⚠️ Git & Security Notes

Do not upload:

```text
node_modules/
.env
*.log
dist/
```

Keep `node_modules` on your local machine. It can always be recreated with:

```bash
npm install
```

Never expose:

- MongoDB connection strings
- JWT secrets
- ImageKit private keys
- Other private credentials

---

# 📌 Current Project Status

🚧 **In Progress**

This project is being developed as part of my backend development learning journey.

The purpose is to learn by building, testing, debugging, and improving a practical backend application.

---

# 📚 Part of My Learning Journey

This project is part of:

```text
nodejs-express-mongodb-learning
```

My learning progression includes:

```text
Node.js
   ↓
Express.js
   ↓
REST APIs
   ↓
MongoDB
   ↓
Mongoose
   ↓
Authentication
   ↓
JWT
   ↓
Cookies
   ↓
Middleware
   ↓
File Uploads
   ↓
Cloud Storage
   ↓
Spotify Backend Project
```

---

## 👨‍💻 Author

**Anis Khan**

Node.js, Express.js & MongoDB Learning Journey — 2026

---

⭐ **Learning by building, experimenting, debugging, and improving.**
