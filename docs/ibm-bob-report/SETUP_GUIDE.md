# 🚀 CodePilot AI Workspace - Complete Setup Guide

This guide will walk you through setting up and running the CodePilot AI Workspace from scratch.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

---

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL** on your machine

2. **Create a database**:
```sql
CREATE DATABASE codepilot_ai;
```

3. **Create a user** (optional):
```sql
CREATE USER codepilot_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE codepilot_ai TO codepilot_user;
```

### Option 2: Cloud PostgreSQL (Recommended for Production)

Use one of these cloud providers:

- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **Neon** (https://neon.tech) - Free tier available

After creating your database, copy the connection string.

---

## 🔧 Backend Setup

### 1. Navigate to Server Directory

```bash
cd server
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/codepilot_ai?schema=public"

# JWT Secrets (generate strong random strings)
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-characters"
JWT_REFRESH_EXPIRES_IN="30d"

# Application
NODE_ENV=development
PORT=3001
API_PREFIX=api/v1

# CORS (frontend URL)
CORS_ORIGIN=http://localhost:5173

# Optional: GitHub API
GITHUB_TOKEN=your_github_personal_access_token

# Optional: IBM Bob AI
IBM_BOB_API_KEY=your_ibm_bob_api_key
IBM_BOB_API_URL=https://api.ibm.com/bob/v1
```

**Generate secure JWT secrets:**
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create all necessary tables in your database.

### 6. (Optional) Seed Database

```bash
npm run prisma:seed
```

This will populate your database with sample data for testing.

### 7. Start Backend Server

**Development mode (with hot reload):**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run build
npm run start:prod
```

The backend API will be available at: **http://localhost:3001/api/v1**

---

## 🎨 Frontend Setup

### 1. Navigate to Root Directory

```bash
cd ..  # if you're in the server directory
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start Frontend Development Server

```bash
npm run dev
# or
pnpm dev
```

The frontend will be available at: **http://localhost:5173**

---

## ✅ Verify Installation

### 1. Check Backend Health

Open your browser or use curl:

```bash
curl http://localhost:3001/api/v1/health
```

You should see:
```json
{
  "status": "ok",
  "message": "CodePilot AI Workspace API is running",
  "timestamp": "2026-05-17T...",
  "version": "1.0.0",
  "environment": "development"
}
```

### 2. Check Frontend

Open http://localhost:5173 in your browser. You should see the CodePilot AI landing page.

---

## 🔐 Testing Authentication

### 1. Register a New User

**Using the API:**

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "DEVELOPER"
  }'
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "DEVELOPER",
    "status": "ACTIVE",
    ...
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

### 3. Access Protected Route

```bash
curl http://localhost:3001/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🛠️ Development Tools

### Prisma Studio (Database GUI)

View and edit your database:

```bash
cd server
npm run prisma:studio
```

Opens at: http://localhost:5555

### API Testing

Use tools like:
- **Postman** - Import the API collection
- **Insomnia** - REST client
- **Thunder Client** - VS Code extension

---

## 📦 Project Structure

```
CodePilot AI Workspace/
├── src/                    # Frontend
│   ├── app/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.tsx
│   ├── data/              # Mock data
│   ├── types/             # TypeScript types
│   └── styles/            # Global styles
│
├── server/                 # Backend
│   ├── src/
│   │   ├── auth/          # ✅ Authentication (COMPLETE)
│   │   ├── users/         # ✅ User management (COMPLETE)
│   │   ├── database/      # ✅ Prisma service (COMPLETE)
│   │   ├── repositories/  # Repository operations
│   │   ├── ai-services/   # AI integration
│   │   └── ...
│   ├── prisma/
│   │   └── schema.prisma  # ✅ Database schema (COMPLETE)
│   └── .env               # Environment variables
│
└── docs/                   # Documentation
```

---

## 🔍 What's Implemented

### ✅ Backend (Complete)

1. **Authentication System**
   - JWT-based authentication
   - Access & refresh tokens
   - Password hashing with bcrypt
   - Role-based access control (RBAC)
   - Protected routes with guards
   - User registration & login
   - Profile management
   - Password change

2. **User Management**
   - CRUD operations
   - Activity logging
   - User statistics
   - Role management (Admin, Team Lead, Developer)

3. **Database**
   - Complete Prisma schema
   - 15+ models with relations
   - Migrations ready
   - Seed scripts ready

4. **API Endpoints**
   - `POST /api/v1/auth/register` - Register new user
   - `POST /api/v1/auth/login` - Login
   - `POST /api/v1/auth/refresh` - Refresh token
   - `GET /api/v1/auth/profile` - Get current user
   - `PATCH /api/v1/auth/profile` - Update profile
   - `POST /api/v1/auth/change-password` - Change password
   - `GET /api/v1/users` - List users (Admin only)
   - `GET /api/v1/users/me` - Get current user
   - `GET /api/v1/users/me/activities` - Get user activities
   - `GET /api/v1/users/me/stats` - Get user statistics

### 🚧 In Progress

- Repository Analyzer module
- AI Services integration
- WebSocket real-time features
- Frontend authentication pages
- State management (Zustand + React Query)

### ⏳ Planned

- Documentation Generator
- Test Generator
- Debug Assistant
- Refactor Assistant
- Team Insights
- Notifications

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server`

**Solution:**
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Verify database exists
4. Check firewall settings

### Port Already in Use

**Error:** `Port 3001 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process or change PORT in .env
```

### Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd server
npm run prisma:generate
```

### TypeScript Errors

The TypeScript errors you see are expected until you run `npm install` in both directories. They will disappear once dependencies are installed.

---

## 🚀 Next Steps

1. **Install dependencies** in both frontend and backend
2. **Set up your database** (local or cloud)
3. **Configure environment variables**
4. **Run migrations**
5. **Start both servers**
6. **Test the authentication flow**
7. **Start building additional features**

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 💡 Tips

1. **Use Prisma Studio** to visualize your database
2. **Check the logs** for detailed error messages
3. **Use environment variables** for sensitive data
4. **Test API endpoints** with Postman/Insomnia
5. **Keep dependencies updated** regularly

---

## 🤝 Need Help?

- Check the [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for architecture details
- Review the [README.md](./README.md) for feature overview
- Open an issue on GitHub
- Contact the development team

---

**Happy Coding! 🎉**