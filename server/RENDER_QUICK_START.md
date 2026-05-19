# 🚀 Render Quick Start Guide

## One-Page Deployment Reference for CodePilot AI Backend

---

## 📋 Pre-Deployment Checklist

- [ ] GitHub repository connected to Render
- [ ] PostgreSQL database created in Render
- [ ] Environment variables ready
- [ ] Code pushed to main branch

---

## ⚙️ Render Service Configuration

### Service Type
**Web Service**

### Build Settings

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npx prisma migrate deploy && npm run start:prod` |
| **Node Version** | 20.x (Auto-detected from engines) |

### Environment Variables

```bash
# Required
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public&connection_limit=5
DIRECT_DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=production
PORT=10000

# Optional
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend.onrender.com
OPENAI_API_KEY=sk-...
GITHUB_TOKEN=ghp_...
```

---

## 🗄️ Database Setup

### Option 1: Render PostgreSQL (Recommended)

1. Create PostgreSQL database in Render
2. Copy **Internal Database URL** → `DATABASE_URL`
3. Copy **External Database URL** → `DIRECT_DATABASE_URL`

### Option 2: External PostgreSQL (Neon, Supabase, etc.)

1. Get connection strings from provider
2. Use **Pooled Connection** → `DATABASE_URL`
3. Use **Direct Connection** → `DIRECT_DATABASE_URL`

---

## 🔑 JWT Secret Generation

```bash
# Generate secure JWT secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Deployment Steps

### 1. Create Web Service
- Go to Render Dashboard
- Click "New +" → "Web Service"
- Connect GitHub repository
- Select `server` directory (if monorepo)

### 2. Configure Service
- **Name**: `codepilot-ai-backend`
- **Region**: Choose closest to users
- **Branch**: `main`
- **Root Directory**: `server` (if monorepo)
- **Environment**: `Node`
- **Build Command**: See above
- **Start Command**: See above

### 3. Add Environment Variables
- Click "Environment" tab
- Add all required variables
- Use "Generate" for JWT_SECRET

### 4. Deploy
- Click "Create Web Service"
- Wait for build to complete (~3-5 minutes)
- Check logs for errors

---

## 🔍 Verify Deployment

### Health Check
```bash
curl https://your-app.onrender.com/
```

### Check Logs
- Render Dashboard → Your Service → Logs
- Look for: "Application is running on port 10000"

### Test API
```bash
# Health endpoint
curl https://your-app.onrender.com/health

# Auth endpoint
curl -X POST https://your-app.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 🐛 Common Issues & Fixes

### Issue: Build Timeout
**Solution**: Increase build timeout in Render settings

### Issue: Database Connection Failed
**Solution**: Check DATABASE_URL format and credentials

### Issue: Prisma Client Not Generated
**Solution**: Ensure `postinstall` script runs: `"postinstall": "prisma generate"`

### Issue: Port Already in Use
**Solution**: Render automatically assigns PORT, don't hardcode it

### Issue: CORS Errors
**Solution**: Set correct `CORS_ORIGIN` in environment variables

---

## 📊 Monitoring

### Application Logs
```
Render Dashboard → Your Service → Logs
```

### Database Metrics
```
Render Dashboard → Your Database → Metrics
```

### Health Checks
Render automatically monitors your `/` endpoint

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push
- Enabled by default
- Push to `main` branch triggers deployment
- Check "Auto-Deploy" in service settings

### Manual Deploy
- Render Dashboard → Your Service → "Manual Deploy"
- Select branch and click "Deploy"

---

## 🔐 Security Best Practices

- ✅ Use strong JWT secrets (32+ characters)
- ✅ Enable HTTPS (automatic on Render)
- ✅ Set specific CORS origins
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting (already configured)
- ✅ Keep dependencies updated

---

## 📈 Scaling

### Vertical Scaling
- Render Dashboard → Your Service → Settings
- Upgrade plan for more CPU/RAM

### Horizontal Scaling
- Add more instances in service settings
- Render handles load balancing automatically

---

## 💰 Cost Optimization

### Free Tier
- Web Service: Free (with limitations)
- PostgreSQL: Free 90 days, then $7/month

### Starter Tier
- Web Service: $7/month
- PostgreSQL: $7/month
- **Total**: ~$14/month

### Production Tier
- Web Service: $25/month
- PostgreSQL: $20/month
- **Total**: ~$45/month

---

## 🆘 Support Resources

- [Render Documentation](https://render.com/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Project DEPLOYMENT.md](./DEPLOYMENT.md)
- [Dependency Fix Report](./DEPENDENCY_FIX_REPORT.md)

---

## ✅ Post-Deployment Checklist

- [ ] Service deployed successfully
- [ ] Health check passing
- [ ] Database connected
- [ ] Migrations applied
- [ ] API endpoints responding
- [ ] CORS configured
- [ ] Logs showing no errors
- [ ] Frontend connected
- [ ] Authentication working
- [ ] Monitoring enabled

---

## 🎉 Success!

Your CodePilot AI Backend is now live on Render!

**Next Steps:**
1. Test all API endpoints
2. Connect frontend application
3. Set up monitoring alerts
4. Configure custom domain (optional)
5. Enable auto-scaling (if needed)

---

**Quick Links:**
- [Full Deployment Guide](./DEPLOYMENT.md)
- [Dependency Fix Report](./DEPENDENCY_FIX_REPORT.md)
- [Render Dashboard](https://dashboard.render.com)

---

**Made with ❤️ by CodePilot Team**