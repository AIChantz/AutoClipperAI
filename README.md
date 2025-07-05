# AutoClipper AI - Railway Deployment

## Overview

AutoClipper AI is a comprehensive SaaS platform that automates video content creation from WHOP courses. The system uses AI to identify clip-worthy moments, generates captions, and publishes to social media platforms.

## Features

- 🤖 AI-powered video processing with OpenAI Whisper and GPT-4o
- 📱 Automated social media publishing (Instagram, TikTok, YouTube)
- 🔐 Complete authentication and subscription system
- 💳 Stripe payment integration with multiple pricing tiers
- 🎯 WHOP marketplace integration
- 📊 Business intelligence and revenue analytics

## Railway Deployment

This application is optimized for Railway deployment with:

- PostgreSQL database integration
- File storage for video uploads
- Background job processing
- Environment variable management
- Automatic health checks

## Environment Variables Required

```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
REPLIT_DB_URL=your_replit_db_url

# AI Services
OPENAI_API_KEY=sk-...

# Payment Processing
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Social Media APIs (Optional)
INSTAGRAM_ACCESS_TOKEN=...
TIKTOK_ACCESS_TOKEN=...
YOUTUBE_API_KEY=...

# Application
NODE_ENV=production
PORT=8080
```

## Deployment Steps

1. Connect Railway to your GitHub repository
2. Railway will auto-detect the Node.js application
3. Add your environment variables in Railway dashboard
4. Deploy with automatic PostgreSQL database provisioning

## Health Checks

The application includes multiple health check endpoints:
- `/` - Root health check
- `/health` - Detailed health status
- `/api/status` - API status check

All endpoints return proper 200 status codes for Railway monitoring.