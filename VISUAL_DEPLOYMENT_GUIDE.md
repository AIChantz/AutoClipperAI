# AutoClipper AI - Visual Deployment Guide

## 🎯 What We're Doing
Moving your video app from Replit to Railway so people can use it on the internet.

## 📋 Before You Start
- ✅ Railway account (you have this)
- ✅ 15 minutes of time
- ✅ OpenAI account (for AI features)
- ✅ Stripe account (for payments)

---

## Step 1: Download Your App Files

**In Replit:**
1. Look for **☰ Menu** (three lines) in top left corner
2. Click **"Download as ZIP"**
3. Save file to your Desktop
4. **Right-click the ZIP file** → "Extract All" (Windows) or double-click (Mac)

**You now have:** A folder called "workspace" with all your app files

---

## Step 2: Create GitHub Account (Free Storage)

**Why GitHub?** It's like Google Drive but for apps. Railway needs this to find your files.

1. Go to **GitHub.com**
2. Click **"Sign up"** (top right)
3. Choose username and password
4. Verify your email

**Create your app storage:**
1. Click green **"New"** button
2. Repository name: **autoclipper-ai**
3. Make sure **"Public"** is selected
4. Click **"Create repository"**

---

## Step 3: Upload Your App Files

**In your new GitHub repository:**
1. Click **"uploading an existing file"** (blue link)
2. **Drag your extracted folder** into the upload box
3. Wait for green checkmarks to appear
4. Scroll down and click **"Commit changes"**

**Success!** Your app files are now safely stored online.

---

## Step 4: Connect Railway to Your Files

**In Railway.app:**
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Connect GitHub"**
4. Find **"autoclipper-ai"** in the list
5. Click **"Deploy"**

**What happens:** Railway starts building your app (like assembling IKEA furniture)

---

## Step 5: Add Database (Storage for Your App)

**In your Railway project:**
1. Click **"New Service"**
2. Select **"PostgreSQL"**
3. Click **"Add PostgreSQL"**
4. Wait 2 minutes for setup

**What this does:** Creates a place for your app to remember users, videos, and clips

---

## Step 6: Add Your Secret Keys

**Think of these like passwords for your app to talk to other services.**

**In Railway, click your main app (not database):**
1. Go to **"Variables"** tab
2. Click **"Add Variable"** for each:

**Required Keys:**
- **Name:** `OPENAI_API_KEY` **Value:** `sk-your-key-from-openai`
- **Name:** `STRIPE_SECRET_KEY` **Value:** `sk_your-key-from-stripe`  
- **Name:** `NODE_ENV` **Value:** `production`

**Where to get keys:**
- **OpenAI:** platform.openai.com → API Keys → Create new
- **Stripe:** dashboard.stripe.com → Developers → API Keys → Copy secret key

---

## Step 7: Wait for Your App to Build

**Watch the magic happen:**
1. Go to **"Deployments"** tab
2. You'll see **"Building..."** then **"Success"**
3. Takes about 3-5 minutes
4. Look for green checkmark

**What's happening:** Railway is setting up your app on their computers

---

## Step 8: Get Your Website Address

**In Railway:**
1. Go to **"Settings"** tab
2. Click **"Generate Domain"**
3. Copy your new website URL

**You get something like:** `https://autoclipper-ai-production.railway.app`

---

## Step 9: Test Your Website

**Visit your new website:**
1. **Open your URL** in a new browser tab
2. **You should see:** "AutoClipper AI is running"
3. **Test these pages:**
   - Add `/health` to your URL - should show "healthy"
   - Add `/api/status` to your URL - should show "online"

**If it works:** Congratulations! Your app is live on the internet! 🎉

---

## 🚨 If Something Goes Wrong

**"Build Failed"**
- Check that you uploaded ALL files from Replit
- Look at "Logs" tab for red error messages

**"App Won't Start"**
- Make sure you added the OpenAI API key correctly
- Check that variable names match exactly

**"Can't Connect to Database"**
- Wait 5 minutes - databases take time to start
- Try refreshing your website

**"Variables Not Working"**
- Double-check spelling of variable names
- Make sure you clicked "Add Variable" for each one

---

## 🎯 You're Done!

**Your AutoClipper AI is now:**
- ✅ Running on professional hosting
- ✅ Available 24/7 to anyone with the URL
- ✅ Ready to handle thousands of users
- ✅ Automatically backed up and secured

**Your website URL is your business!** Share it with customers, add it to your marketing, and start making money with your AI video app.

**Next steps:** Set up a custom domain like `yourapp.com` in Railway settings.