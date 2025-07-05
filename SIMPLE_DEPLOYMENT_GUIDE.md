# How to Deploy AutoClipper AI - Simple Guide

## What You'll Need
- Your Railway account (already set up ✅)
- Your project files from Replit
- About 15 minutes

## Step 1: Get Your Files from Replit

1. **In Replit, find the menu** (three horizontal lines in top left)
2. **Click "Download as ZIP"**
3. **Save the ZIP file** to your computer
4. **Extract/unzip the file** - you'll get a folder with all your app files

## Step 2: Upload to GitHub (Free)

**Why GitHub?** Railway works best when connected to GitHub. Don't worry - it's free and easy.

1. **Go to GitHub.com** and sign up for free (if you don't have an account)
2. **Click the green "New" button** to create a new repository
3. **Name it:** `autoclipper-ai`
4. **Make it Public** (free option)
5. **Click "Create repository"**

**Upload your files:**
1. **Click "uploading an existing file"**
2. **Drag your extracted folder** into the upload area
3. **Wait for upload to complete**
4. **Click "Commit changes"** at the bottom

## Step 3: Connect Railway to GitHub

1. **Go to Railway.app** and log in
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Connect your GitHub account** (click "Connect GitHub")
5. **Select your `autoclipper-ai` repository**

## Step 4: Add Database

Your app needs a database to store information.

1. **In your Railway project, click "New Service"**
2. **Select "PostgreSQL"**
3. **Click "Add PostgreSQL"**
4. **Wait 1-2 minutes** for setup to complete

## Step 5: Add Your API Keys

Your app needs special keys to work with other services.

1. **Click on your main app service** (not the database)
2. **Go to "Variables" tab**
3. **Add these one by one:**

**Required Keys:**
- Name: `OPENAI_API_KEY` Value: `sk-your-openai-key-here`
- Name: `STRIPE_SECRET_KEY` Value: `sk_your-stripe-key-here`
- Name: `NODE_ENV` Value: `production`

**How to get these keys:**
- **OpenAI Key:** Go to platform.openai.com → API Keys → Create new key
- **Stripe Key:** Go to dashboard.stripe.com → Developers → API Keys → Copy secret key

## Step 6: Deploy Your App

1. **Railway will automatically start building** your app
2. **Watch the "Deployments" tab** - you'll see progress
3. **Wait 3-5 minutes** for the build to complete
4. **Look for "Success" message**

## Step 7: Get Your Live Website

1. **In Railway, go to "Settings" tab**
2. **Click "Generate Domain"**
3. **Copy your new website URL** (looks like: `https://your-app-name.railway.app`)

## Step 8: Test Your Website

1. **Visit your new website URL**
2. **You should see:** "AutoClipper AI is running" or similar
3. **Test these pages:**
   - `your-url.com/health` - Should show "healthy"
   - `your-url.com/api/status` - Should show "online"

## That's It! 🎉

Your AutoClipper AI is now live on the internet. Anyone can visit your website URL and use your app.

## Common Issues & Solutions

**Problem:** "Build failed"
**Solution:** Check that you uploaded all files from Replit correctly

**Problem:** "App won't start"
**Solution:** Make sure you added the OpenAI API key in Step 5

**Problem:** "Can't connect to database"
**Solution:** The PostgreSQL database takes a few minutes to start - wait and try again

**Problem:** "Variables not working"
**Solution:** Double-check that variable names are typed exactly as shown

## Next Steps

1. **Set up your domain:** Railway lets you use a custom domain like `yourapp.com`
2. **Add more API keys:** For social media features, add Instagram, TikTok, YouTube keys
3. **Monitor your app:** Railway shows you visitor stats and performance

## Need Help?

- Railway has live chat support
- Check the "Logs" tab in Railway to see what's happening
- All your files are safely stored in GitHub

Your AutoClipper AI is now running on professional hosting that can handle thousands of users!