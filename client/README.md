# CodePilot AI

> Built for IBM BOB Hackathon

CodePilot AI is an AI-powered developer workspace focused on repository analysis, debugging assistance, documentation generation, and developer onboarding.

Built with a modern full-stack architecture using React, NestJS, Prisma, and PostgreSQL.

---

# ✨ Features

## 🔐 Authentication System

* JWT-based authentication
* Secure login and signup flows
* Protected routes
* Role-based access control
* Session persistence
* Refresh token support

## 📦 Repository Analyzer

* GitHub repository URL analysis
* Repository health insights
* AI-generated summaries
* Architecture explanation
* Dependency overview
* Terminal-style analysis logs

## 🧠 AI Documentation Generator

* README generation
* Architecture documentation
* Folder explanations
* API documentation support
* Markdown preview

## 🐞 Debug Assistant

* Stack trace analysis
* AI-generated debugging suggestions
* Monaco editor integration
* Suggested fixes and explanations

## 👥 Developer Onboarding

* Repository walkthroughs
* Setup instructions
* Team conventions
* Architecture onboarding

## 📊 Dashboard & Insights

* Productivity metrics
* Activity feed
* Repository overview
* Team insights
* Quick actions

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Router
* React Query
* Zustand
* Axios
* Monaco Editor

## Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Socket.io
* Multer

---

# 📁 Project Structure

```txt
codepilot-ai/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
├── docs/
│   ├── screenshots/
│   └── architecture.md
│
├── README.md
└── .gitignore
```

---

# 🚀 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/18-monarch/codepilot-ai.git
cd codepilot-ai
```

---

# ⚙️ Backend Setup

## Navigate to Server

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file inside `server/`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/codepilot_ai?schema=public"

JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

PORT=3001
NODE_ENV=development
API_PREFIX=api/v1

CORS_ORIGIN=http://localhost:5173
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Database Migrations

```bash
npx prisma migrate dev
```

## Start Backend

```bash
npm run start:dev
```

Backend runs on:

```txt
http://localhost:3001
```

---

# 🎨 Frontend Setup

## Navigate to Client

```bash
cd client
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env` inside `client/`

```env
VITE_API_URL=http://localhost:3001/api/v1
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🔑 Authentication Flow

The application supports:

* User registration
* User login
* JWT authentication
* Protected dashboard routes
* Session persistence
* Logout functionality

Authentication is integrated between:

* React frontend
* NestJS backend
* Prisma/PostgreSQL database

---

# 📸 Screenshots

Add screenshots inside:

```txt
docs/screenshots/
```

Recommended screenshots:

* Landing Page
* Login Page
* Dashboard
* Repository Analyzer
* Debug Assistant

---

# 🧪 API Endpoints

## Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
GET  /api/v1/auth/profile
```

## Users

```http
GET /api/v1/users/me
GET /api/v1/users/me/stats
GET /api/v1/users/me/activities
```

---

# 🧠 Design Inspiration

Inspired by modern developer tools:

* Linear
* Vercel
* GitHub Copilot
* Cursor
* Notion AI
* Warp

The UI focuses on:

* clean developer experience
* dark futuristic theme
* smooth interactions
* glassmorphism-inspired components
* terminal-inspired workflows

---

# 🤝 Contributing

Contributions, improvements, and feedback are welcome.

To contribute:

```bash
fork -> clone -> create branch -> commit -> open PR
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed by:

**Khushi Patel**
**Jal Patel**
**Mohit Chaudhari**


GitHub:
[https://github.com/18-monarch](https://github.com/18-monarch)

---
