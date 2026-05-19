# CodePilot AI Backend - Deployment Guide

## 🎯 Overview

This guide provides production-ready deployment instructions for the CodePilot AI Backend on Render with PostgreSQL and Prisma ORM.

---

## 📋 Root Cause Analysis

### Original Issue
The backend deployment was failing due to **NestJS dependency version conflicts**:

- `@nestjs/common`: v10.4.22
- `@nestjs/core`: v10.4.22  
- `@nestjs/platform-socket.io`: **v11.1.21** ❌ (Mismatch)
- `@nestjs/cli`: **v11.0.21** ❌ (Mismatch)
- `@nestjs/schematics`: **v11.1.0** ❌ (Mismatch)
- `@nestjs/config`: **v4.0.4** (Incompatible with v10)
- `@nestjs/schedule`: **v6.1.3** (Incompatible with v10)
- `@nestjs/throttler`: **v6.5.0** (Incompatible with v10)

### Resolution
All NestJS packages have been aligned to **v10.x** with compatible peer dependencies.

---

## ✅ Fixed Dependencies

### Core NestJS Packages (v10.4.4)
```json
{
  "@nestjs/common": "^10.4.4",
  "@nestjs/core": "^10.4.4",
  "@nestjs/platform-express": "^10.4.4",
  "@nestjs/platform-socket.io": "^10.4.4",
  "@nestjs/websockets": "^10.4.4",
  "@nestjs/testing": "^10.4.4"
}
```

### NestJS Extensions (Compatible with v10)
```json
{
  "@nestjs/jwt": "^10.2.0",
  "@nestjs/passport": "^10.0.3",
  "@nestjs/config": "^3.2.3",
  "@nestjs/schedule": "^4.1.1",
  "@nestjs/throttler": "^5.2.0"
}
```

### Development Tools (v10.x)
```json
{
  "@nestjs/cli": "^10.4.5",
  "@nestjs/schematics": "^10.1.4"
}
```

### Database & ORM
```json
{
  "@prisma/client": "^5.8.0",
  "prisma": "^5.8.0",
  "pg": "^8.11.3"
}
```

---

## 🚀 Render Deployment Configuration

### 1. Environment Variables

Set these in Render Dashboard → Environment:

```bash
# Database (Render PostgreSQL or Neon)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public&connection_limit=5&pool_timeout=10"
DIRECT_DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="7d"

# Application
NODE_ENV="production"
PORT="10000"

# CORS (Frontend URL)
CORS_ORIGIN="https://your-frontend.onrender.com"

# Optional: AI Services
OPENAI_API_KEY="sk-..."
GITHUB_TOKEN="ghp_..."
```

### 2. Build Command

```bash
npm install && npx prisma generate && npm run build
```

**Explanation:**
- `npm install`: Install all dependencies
- `npx prisma generate`: Generate Prisma Client
- `npm run build`: Compile TypeScript to JavaScript

### 3. Start Command

```bash
npx prisma migrate deploy && npm run start:prod
```

**Explanation:**
- `npx prisma migrate deploy`: Apply pending migrations (production-safe)
- `npm run start:prod`: Start the production server

### 4. Render Service Settings

| Setting | Value |
|---------|-------|
| **Environment** | Node |
| **Region** | Choose closest to your users |
| **Branch** | main |
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npx prisma migrate deploy && npm run start:prod` |
| **Auto-Deploy** | Yes |
| **Health Check Path** | `/` or `/health` |

---

## 🔧 Node.js Version

### Recommended Version
```json
{
  "engines": {
    "node": ">=18.0.0 <21.0.0",
    "npm": ">=9.0.0"
  }
}
```

**Why Node 18-20?**
- ✅ LTS (Long Term Support)
- ✅ Native fetch API
- ✅ Best performance for NestJS
- ✅ Compatible with all dependencies
- ✅ Render default support

---

## 🗄️ Database Configuration

### PostgreSQL Setup

#### Option 1: Render PostgreSQL (Recommended)
1. Create PostgreSQL database in Render
2. Copy **Internal Database URL** to `DATABASE_URL`
3. Copy **External Database URL** to `DIRECT_DATABASE_URL`

#### Option 2: Neon (Serverless PostgreSQL)
1. Create database at [neon.tech](https://neon.tech)
2. Use **Pooled Connection** for `DATABASE_URL`
3. Use **Direct Connection** for `DIRECT_DATABASE_URL`

### Prisma Configuration

**schema.prisma** is already configured:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}
```

### Migration Strategy

**Development:**
```bash
npm run prisma:migrate:dev
```

**Production (Render):**
```bash
npx prisma migrate deploy
```

**Important:** Never use `prisma migrate dev` in production!

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use strong JWT secrets (min 32 characters)
- ✅ Rotate secrets regularly
- ✅ Use different secrets per environment

### 2. Database Security
- ✅ Use connection pooling (`connection_limit=5`)
- ✅ Enable SSL in production
- ✅ Restrict database access by IP
- ✅ Use read replicas for scaling

### 3. API Security
- ✅ Enable CORS with specific origins
- ✅ Use rate limiting (Throttler)
- ✅ Implement JWT authentication
- ✅ Validate all inputs (class-validator)
- ✅ Use helmet for HTTP headers

---

## 📊 Performance Optimization

### 1. Database Connection Pooling
```typescript
// Prisma automatically handles pooling
// Configure in DATABASE_URL:
?connection_limit=5&pool_timeout=10
```

### 2. Caching Strategy
```typescript
// Implement Redis caching for:
- User sessions
- API responses
- Database queries
```

### 3. Build Optimization
```json
{
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build"
  }
}
```

---

## 🧪 Testing Before Deployment

### 1. Local Build Test
```bash
cd server
npm install
npm run build
npm run start:prod
```

### 2. Database Connection Test
```bash
npm run prisma:generate
npx prisma db push
```

### 3. Health Check
```bash
curl http://localhost:3000/
```

---

## 🚨 Troubleshooting

### Issue: Dependency Conflicts
**Solution:** Delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Prisma Client Not Generated
**Solution:** Run generation manually:
```bash
npx prisma generate
```

### Issue: Migration Failures
**Solution:** Check database connection and run:
```bash
npx prisma migrate resolve --rolled-back "migration_name"
npx prisma migrate deploy
```

### Issue: Build Timeout on Render
**Solution:** Increase build timeout in Render settings or optimize build:
```bash
# Use npm ci instead of npm install
npm ci && npx prisma generate && npm run build
```

### Issue: Memory Issues
**Solution:** Increase Node.js memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run start:prod
```

---

## 📈 Monitoring & Logging

### 1. Application Logs
```typescript
// Use NestJS Logger
import { Logger } from '@nestjs/common';

private readonly logger = new Logger(ServiceName.name);
this.logger.log('Message');
this.logger.error('Error', trace);
```

### 2. Render Logs
- Access via Render Dashboard → Logs
- Set up log drains to external services

### 3. Health Checks
```typescript
@Get('health')
healthCheck() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd server && npm ci
      - run: cd server && npm run build
      - run: cd server && npm test
```

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Render Documentation](https://render.com/docs)
- [PostgreSQL Best Practices](https://www.postgresql.org/docs/current/index.html)

---

## ✨ Production Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Migrations applied successfully
- [ ] Build completes without errors
- [ ] Health check endpoint working
- [ ] CORS configured correctly
- [ ] JWT authentication working
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Error handling implemented
- [ ] API documentation updated
- [ ] Load testing completed
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

---

## 🎉 Deployment Success

Your CodePilot AI Backend is now production-ready and deployed on Render!

**Next Steps:**
1. Monitor application logs
2. Set up alerts for errors
3. Configure auto-scaling if needed
4. Implement backup strategy
5. Document API endpoints
6. Set up staging environment

---

**Made with ❤️ by CodePilot Team**