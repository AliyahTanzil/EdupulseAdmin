---
noteId: "b766aa700b6411f1940c7b1c911d6a2f"
tags: []
---

# School Administration System

## Part 5: Deployment Guide (Zero-Cost Hosting)

**Version:** 1.0.0
**Last Updated:** January 26, 2025
**Document:** 5 of 6

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Deployment (Supabase)](#step-1-database-deployment-supabase)
3. [Redis Deployment (Upstash)](#step-2-redis-deployment-upstash)
4. [Backend Deployment (Render)](#step-3-backend-api-deployment-render)
5. [Frontend Deployment (Vercel)](#step-4-frontend-deployment-vercel)
6. [Firebase Setup](#step-5-firebase-setup-fcm)
7. [Cloudflare Setup](#step-6-cloudflare-setup-cdn--security)
8. [Email Service](#step-7-email-service-setup)
9. [Monitoring](#step-8-monitoring--error-tracking)
10. [Mobile App Deployment](#step-9-mobile-app-deployment)

---

## Pre-Deployment Checklist

### Environment Variables

```bash
# ✅ Check all required variables are set
- [ ] DATABASE_URL
- [ ] REDIS_URL
- [ ] JWT_SECRET (32+ characters)
- [ ] JWT_REFRESH_SECRET (32+ characters)
- [ ] ENCRYPTION_KEY (32 characters)
- [ ] FIREBASE credentials
- [ ] Email service API key
- [ ] CORS_ORIGINS
```

### Code Quality

```bash
# ✅ Verify code is production-ready
- [ ] All tests passing (npm test)
- [ ] No console.log in production code
- [ ] Error handling implemented
- [ ] Security audit passed
- [ ] Performance optimized
- [ ] Code reviewed
```

### Database

```bash
# ✅ Database ready for deployment
- [ ] Migrations tested
- [ ] Seed data prepared
- [ ] Indexes created
- [ ] Backup strategy defined
- [ ] Row-level security configured
```

---

## STEP 1: Database Deployment (Supabase)

### Create Supabase Project

```bash
# 1. Visit https://supabase.com
# 2. Click "New Project"
# 3. Fill in details:
Project Name: school-admin-db
Database Password: [Strong password - save this!]
Region: [Select closest to your users]
Pricing Plan: Free

# 4. Click "Create new project"
# Wait 2-3 minutes for provisioning
```

### Get Connection String

```bash
# 1. Go to Project Settings > Database
# 2. Copy "Connection string" (URI format)
# 3. Replace [YOUR-PASSWORD] with your database password

Example:
postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

### Configure Supabase Locally

```bash
# In your backend directory
cd backend

# Create or update .env
echo 'DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"' >> .env

# Test connection
npx prisma db pull
```

### Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Verify migration
npx prisma migrate status

# Open Prisma Studio to view data
npx prisma studio
# Opens at http://localhost:5555
```

### Configure Row-Level Security (RLS)

```sql
-- Access Supabase SQL Editor
-- Go to SQL Editor in Supabase Dashboard

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Example Policy: Students can only view their own data
CREATE POLICY "Students view own data"
  ON students FOR SELECT
  USING (user_id = auth.uid());

-- Example Policy: Teachers can view their class students
CREATE POLICY "Teachers view class students"
  ON students FOR SELECT
  USING (
    class_id IN (
      SELECT class_id FROM class_teachers
      WHERE teacher_id = auth.uid()
    )
  );

-- Example Policy: Admins have full access
CREATE POLICY "Admins full access"
  ON students FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );
```

### Seed Initial Data

```bash
# Create seed file
# prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  console.log('Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

# Run seed
npx prisma db seed
```

### Enable Automatic Backups

```bash
# In Supabase Dashboard:
# 1. Go to Settings > Database
# 2. Backups section
# 3. Enable automatic backups (Free plan: 7 days retention)
# 4. Configure backup schedule
```

**✅ Supabase Setup Complete!**

---

## STEP 2: Redis Deployment (Upstash)

### Create Upstash Account

```bash
# 1. Visit https://upstash.com
# 2. Sign up (free, no credit card required)
# 3. Click "Create Database"

Database Name: school-admin-redis
Type: Regional
Region: [Select closest to your backend]
Primary Region: [Same as above]

# 4. Click "Create"
```

### Get Connection Details

```bash
# In Upstash Console:
# 1. Click on your database
# 2. Go to "Details" tab
# 3. Copy "UPSTASH_REDIS_REST_URL"

Example:
rediss://default:YOUR_PASSWORD@us1-proper-fish-12345.upstash.io:6379

# Add to .env
echo 'REDIS_URL="rediss://default:YOUR_PASSWORD@region.upstash.io:6379"' >> .env
```

### Test Connection

```javascript
// test-redis.js
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

redis.set('test', 'hello');
redis.get('test').then(console.log); // Output: hello

console.log('Redis connected successfully!');
```

```bash
# Run test
node test-redis.js
```

### Configure Redis for Sessions

```javascript
// config/redis.js
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  connectTimeout: 10000,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
```

**✅ Redis Setup Complete!**

---

## STEP 3: Backend API Deployment (Render)

### Prepare Backend for Deployment

```bash
# 1. Update package.json
{
  "scripts": {
    "start": "node server.js",
    "build": "npx prisma generate"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}

# 2. Create .env.example (without sensitive data)
NODE_ENV=production
PORT=3000
DATABASE_URL=your_supabase_url_here
REDIS_URL=your_upstash_url_here
# ... other variables

# 3. Ensure .gitignore includes .env
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
```

### Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Deploy on Render

```bash
# 1. Visit https://render.com
# 2. Sign up / Log in
# 3. Click "New +" > "Web Service"
# 4. Connect your GitHub repository
# 5. Configure:

Name: school-admin-api
Environment: Node
Branch: main
Build Command: npm install && npx prisma generate
Start Command: npm start
Instance Type: Free

# 6. Click "Advanced" > Add Environment Variables
```

### Add Environment Variables

```bash
# In Render Dashboard, add these variables:

NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
REDIS_URL=rediss://default:PASSWORD@region.upstash.io:6379
JWT_SECRET=your_32_character_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
ENCRYPTION_KEY=your_32_character_encryption_key
BCRYPT_ROUNDS=12
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@project.iam.gserviceaccount.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@school.com
CORS_ORIGINS=https://school.vercel.app
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Deploy

```bash
# Click "Create Web Service"
# Render will:
# 1. Clone your repository
# 2. Install dependencies
# 3. Run build command
# 4. Start your server

# Wait 5-10 minutes for first deployment
# Your API will be live at: https://school-admin-api.onrender.com
```

### Test API

```bash
# Test health endpoint
curl https://school-admin-api.onrender.com/health

# Expected response:
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-26T10:00:00.000Z"
}
```

### Keep Free Tier Alive (Prevent Sleep)

```bash
# Render free tier sleeps after 15 minutes of inactivity
# Solution: Ping it every 14 minutes

# 1. Visit https://uptimerobot.com
# 2. Sign up (free)
# 3. Add New Monitor:

Monitor Type: HTTP(S)
Friendly Name: School Admin API
URL: https://school-admin-api.onrender.com/health
Monitoring Interval: 5 minutes

# This keeps your API awake 24/7!
```

**✅ Backend Deployed!**

---

## STEP 4: Frontend Deployment (Vercel)

### Prepare Frontend

```bash
cd frontend

# 1. Create production environment file
# .env.production

REACT_APP_API_URL=https://school-admin-api.onrender.com/api/v1
REACT_APP_WS_URL=wss://school-admin-api.onrender.com
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef

# 2. Test build locally
npm run build

# 3. Commit
git add .
git commit -m "Prepare frontend for deployment"
git push origin main
```

### Deploy on Vercel

```bash
# Method 1: Vercel CLI
npm install -g vercel
vercel login
cd frontend
vercel --prod

# Method 2: Vercel Dashboard (Recommended)
# 1. Visit https://vercel.com
# 2. Sign up / Log in with GitHub
# 3. Click "Add New" > "Project"
# 4. Import your GitHub repository
# 5. Configure:

Framework Preset: React (Auto-detected)
Root Directory: frontend
Build Command: npm run build
Output Directory: dist (or build)

# 6. Add Environment Variables:
# (Copy from .env.production)

# 7. Click "Deploy"
# Wait 2-3 minutes

# Your site will be live at: https://your-project.vercel.app
```

### Custom Domain (Optional)

```bash
# In Vercel Dashboard:
# 1. Go to your project > Settings > Domains
# 2. Add custom domain: school.com
# 3. Follow DNS configuration instructions
# 4. Vercel automatically provisions SSL certificate

# If using Cloudflare:
# - Add CNAME record in Cloudflare DNS
# - Point to your-project.vercel.app
# - Enable proxy (orange cloud)
```

### Configure Auto-Deploy

```bash
# Vercel automatically deploys on every push to main
# To configure branch deployments:

# 1. Project Settings > Git
# 2. Production Branch: main
# 3. Enable "Auto-Deploy" for production
# 4. Preview deployments for all branches
```

**✅ Frontend Deployed!**

---

## STEP 5: Firebase Setup (FCM)

### Create Firebase Project

```bash
# 1. Visit https://console.firebase.google.com
# 2. Click "Add project"
# 3. Project name: school-admin
# 4. Enable Google Analytics (optional)
# 5. Click "Create project"
```

### Enable Cloud Messaging

```bash
# 1. In Firebase Console:
# 2. Project Settings > Cloud Messaging
# 3. Enable "Firebase Cloud Messaging API"
# 4. Copy "Server key" (for later)
```

### Get Service Account Key

```bash
# 1. Project Settings > Service Accounts
# 2. Click "Generate new private key"
# 3. Download JSON file (firebase-service-account.json)
# 4. IMPORTANT: Keep this file secure!

# 5. For Render deployment, convert to base64:
cat firebase-service-account.json | base64 | tr -d '\n'

# Add to Render environment as FIREBASE_SERVICE_ACCOUNT_BASE64

# In your code:
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
    .toString('utf8')
);
```

### Configure Firebase in Backend

```javascript
// services/firebaseService.js
const admin = require('firebase-admin');

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  ? JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
        .toString('utf8')
    )
  : require('../config/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendPushNotification(deviceToken, notification) {
  const message = {
    notification: {
      title: notification.title,
      body: notification.message
    },
    data: notification.data || {},
    token: deviceToken
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent:', response);
    return response;
  } catch (error) {
    console.error('Notification error:', error);
    throw error;
  }
}

module.exports = { sendPushNotification };
```

### Get Web App Config

```bash
# 1. Project Settings > General
# 2. Scroll to "Your apps"
# 3. Click web icon (</>)
# 4. Register app: "School Admin Web"
# 5. Copy Firebase SDK configuration

# Add to frontend .env:
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=project-id
# ... etc
```

### Test Push Notifications

```javascript
// Test in backend
const { sendPushNotification } = require('./services/firebaseService');

sendPushNotification('device_token_here', {
  title: 'Test Notification',
  message: 'FCM is working!',
  data: { test: 'true' }
})
  .then(() => console.log('Success!'))
  .catch(console.error);
```

**✅ Firebase Setup Complete!**

---

## STEP 6: Cloudflare Setup (CDN & Security)

### Add Site to Cloudflare

```bash
# 1. Visit https://cloudflare.com
# 2. Sign up / Log in
# 3. Click "Add a Site"
# 4. Enter: school.com
# 5. Select plan: Free
# 6. Click "Add site"
```

### Update Nameservers

```bash
# Cloudflare will provide 2 nameservers:
nameserver1.cloudflare.com
nameserver2.cloudflare.com

# Go to your domain registrar (GoDaddy, Namecheap, etc.)
# Replace existing nameservers with Cloudflare's
# Wait for propagation (can take up to 24 hours)

# Check status:
# Cloudflare Dashboard will show "Active" when ready
```

### Configure DNS Records

```bash
# In Cloudflare Dashboard > DNS > Records

# Add A Record for root domain:
Type: A
Name: @
IPv4 address: [Get from Vercel - see Vercel DNS settings]
Proxy status: Proxied (orange cloud)
TTL: Auto

# Add CNAME for API:
Type: CNAME
Name: api
Target: school-admin-api.onrender.com
Proxy status: Proxied
TTL: Auto

# Add CNAME for www:
Type: CNAME
Name: www
Target: school.com
Proxy status: Proxied
TTL: Auto
```

### Configure SSL/TLS

```bash
# SSL/TLS > Overview
Encryption mode: Full (strict)

# SSL/TLS > Edge Certificates
☑ Always Use HTTPS
☑ HTTP Strict Transport Security (HSTS)
  - Max Age: 6 months
  - Include subdomains: Yes
  - Preload: Yes
☑ Automatic HTTPS Rewrites
☑ Minimum TLS Version: TLS 1.2
```

### Configure Security (WAF)

```bash
# Security > WAF
☑ Enable Managed Rules

# Add custom rule:
Rule name: Block suspicious IPs
Expression: (cf.threat_score gt 14)
Action: Challenge

# Rate Limiting (Free: 1 rule)
If: Request URI Path contains "/api/auth/login"
Then: Rate limit
Rate: 5 requests per 10 minutes
```

### Configure Speed Optimization

```bash
# Speed > Optimization

Auto Minify:
☑ JavaScript
☑ CSS
☑ HTML

☑ Brotli compression
☑ Rocket Loader (for JavaScript)

# Caching > Configuration
Caching Level: Standard
Browser Cache TTL: 4 hours
```

### Add Page Rules

```bash
# Rules > Page Rules

# Rule 1: Cache static assets
URL: *school.com/static/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month

# Rule 2: Force HTTPS
URL: http://*school.com/*
Settings:
  - Always Use HTTPS
```

### Test Configuration

```bash
# Test SSL
https://www.ssllabs.com/ssltest/analyze.html?d=school.com
# Goal: A+ rating

# Test Security Headers
https://securityheaders.com/?q=school.com
# Goal: A rating

# Test Speed
https://pagespeed.web.dev/
# Enter: https://school.com
# Goal: 90+ score
```

**✅ Cloudflare Setup Complete!**

---

## STEP 7: Email Service Setup

### Option A: Resend (Recommended)

```bash
# 1. Visit https://resend.com
# 2. Sign up
# 3. Verify email

# 4. Add Domain (or use resend.dev for testing)
Domains > Add Domain
Domain: school.com
Purpose: Transactional

# 5. Add DNS records (in Cloudflare):
# Resend will provide TXT and CNAME records

TXT Record:
Name: resend._domainkey
Value: [provided by Resend]

# 6. Wait for verification (5-10 minutes)

# 7. Get API Key
API Keys > Create API Key
Name: school-admin-production
Permission: Sending access
Copy API key

# Add to backend .env:
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Test Email

```javascript
// test-email.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'noreply@school.com',
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<h1>Email service is working!</h1>'
})
  .then(console.log)
  .catch(console.error);
```

**✅ Email Setup Complete!**

---

## STEP 8: Monitoring & Error Tracking

### Sentry (Error Tracking)

```bash
# 1. Visit https://sentry.io
# 2. Sign up
# 3. Create Organization
# 4. Create Project:

Platform: Node.js (for backend)
Name: school-admin-api

# Copy DSN
# Add to backend .env:
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxxxxxxxx

# 5. Create another project for frontend:
Platform: React
Name: school-admin-web

# Install in backend:
npm install @sentry/node

# Configure:
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

# Install in frontend:
npm install @sentry/react

# Configure:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0
});
```

### UptimeRobot (Uptime Monitoring)

```bash
# 1. Visit https://uptimerobot.com
# 2. Sign up (free - 50 monitors)
# 3. Add New Monitor:

Monitor Type: HTTP(S)
Friendly Name: School Admin API
URL: https://api.school.com/health
Monitoring Interval: 5 minutes
Alert Contacts: your@email.com

# 4. Add another monitor for frontend:
Friendly Name: School Admin Web
URL: https://school.com
```

**✅ Monitoring Setup Complete!**

---

## STEP 9: Mobile App Deployment

### Android (Google Play Store)

```bash
# 1. Generate Release Keystore
cd mobile/android/app

keytool -genkeypair -v -storetype PKCS12 \
  -keystore school-admin.keystore \
  -alias school-admin \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Save password securely!

# 2. Configure signing
# android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=school-admin.keystore
MYAPP_UPLOAD_KEY_ALIAS=school-admin
MYAPP_UPLOAD_STORE_PASSWORD=your_password
MYAPP_UPLOAD_KEY_PASSWORD=your_password

# 3. Build Release
cd android
./gradlew bundleRelease

# AAB file at:
# android/app/build/outputs/bundle/release/app-release.aab

# 4. Create Play Console Account
# Visit: https://play.google.com/console
# Pay: $25 one-time fee

# 5. Upload APK and submit
```

### iOS (Apple App Store)

```bash
# 1. Apple Developer Account Required
# Visit: https://developer.apple.com
# Cost: $99/year

# 2. Build in Xcode
cd mobile/ios
open SchoolAdminMobile.xcworkspace

# 3. Archive and upload to App Store
# Product > Archive
# Distribute to App Store

# 4. Submit via App Store Connect
# Visit: https://appstoreconnect.apple.com
```

**✅ Deployment Complete!**

---

## Post-Deployment Verification

### Final Checklist

```bash
# ✅ Test all services
- [ ] Database queries working
- [ ] Redis caching working
- [ ] API endpoints responding
- [ ] WebSocket connections stable
- [ ] Push notifications sending
- [ ] Emails delivering
- [ ] CDN serving static files
- [ ] SSL certificates valid
- [ ] Monitoring alerts configured
- [ ] Error tracking working

# ✅ Performance
- [ ] API response < 200ms
- [ ] Page load < 2 seconds
- [ ] WebSocket latency < 100ms
- [ ] Notification delivery < 30 seconds

# ✅ Security
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] Rate limiting active
- [ ] Security headers present
- [ ] No exposed secrets
```

---

**Congratulations! Your system is now deployed and running at ZERO monthly cost!** 🎉

**Next Document:** [06 - Testing, Maintenance &amp; User Guides](06-testing-maintenance.md)
