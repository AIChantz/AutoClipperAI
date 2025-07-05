# AutoClipper AI - Railway Deployment Guide

## ✅ Pre-Deployment Checklist

Your project is now optimized for Railway with:

- ✅ `railway.json` - Railway-specific configuration
- ✅ `Procfile` - Process configuration (`web: node index.js`)
- ✅ `README.md` - Complete documentation
- ✅ `.env.example` - Environment variables template
- ✅ Health checks - All endpoints return 200 status codes
- ✅ PostgreSQL integration - Database schema ready
- ✅ File storage - Upload directories configured

## 🚀 Deployment Steps

### 1. Connect Repository
- Go to Railway.app dashboard
- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your GitHub account and select your repository

### 2. Add PostgreSQL Database
- In your Railway project, click "New Service"
- Select "PostgreSQL"
- Railway will automatically provide `DATABASE_URL`

### 3. Configure Environment Variables
Add these in Railway's Variables tab:

**Required:**
```
OPENAI_API_KEY=sk-your_key_here
STRIPE_SECRET_KEY=sk_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_your_key_here
NODE_ENV=production
```

**Optional (for full functionality):**
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
INSTAGRAM_ACCESS_TOKEN=your_token
TIKTOK_ACCESS_TOKEN=your_token
YOUTUBE_API_KEY=your_key
```

### 4. Deploy
- Railway will automatically detect your Node.js app
- Click "Deploy" - Railway uses your `Procfile`
- Monitor deployment logs for any issues

### 5. Verify Deployment
Your app will be available at: `https://your-app-name.railway.app`

Test these endpoints:
- `/` - Should return healthy status
- `/health` - Health check endpoint
- `/api/status` - API status

## 🔧 Post-Deployment

1. **Run Database Migrations:**
   ```bash
   npm run db:push
   ```

2. **Test Core Features:**
   - User authentication
   - Video upload
   - AI processing
   - Subscription system

3. **Configure Webhooks:**
   - Set up Stripe webhooks pointing to your Railway URL
   - Update social media app URLs if needed

## 📊 Railway Benefits for AutoClipper AI

- **PostgreSQL Database:** Included and auto-configured
- **File Storage:** Handles video uploads seamlessly
- **Background Jobs:** Perfect for AI processing pipeline
- **Automatic Scaling:** Handles traffic spikes
- **Built-in Monitoring:** Track performance and errors
- **Custom Domains:** Add your own domain easily

## 🛠 Troubleshooting

**If deployment fails:**
1. Check Railway logs for specific errors
2. Verify all required environment variables are set
3. Ensure database connection is established
4. Check health endpoints return 200 status

**Need help?** Railway has excellent documentation and support.

Your AutoClipper AI application is production-ready and will work immediately on Railway!