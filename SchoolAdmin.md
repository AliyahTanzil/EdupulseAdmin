# School Administration System

## Part 1: Overview and Architecture

**Version:** 1.0.0
**Last Updated:** January 26, 2025
**Document:** 1 of 6

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)

---

## Executive Summary

### Project Information

| Item                   | Details                                          |
| ---------------------- | ------------------------------------------------ |
| **Project Name** | School Administration System                     |
| **Version**      | 1.0.0                                            |
| **Duration**     | 3 months (initial release)                       |
| **Total Cost**   | $0/month (free-tier hosting)                     |
| **Team Size**    | 8-10 members                                     |
| **Platforms**    | Web (React), Mobile (iOS/Android - React Native) |
| **Target Users** | Administrators, Teachers, Students, Parents      |

### Key Features

✅ **Biometric Attendance**

- Student attendance tracking with real-time notifications
- Teacher attendance and punctuality monitoring
- Automated check-in/check-out system
- Integration with biometric devices

✅ **Teacher Management**

- Shift scheduling and compliance tracking
- Punctuality scoring and analytics
- Leave management system
- Performance metrics based on attendance

✅ **Real-Time Notifications**

- Push notifications (Mobile & Web)
- Email notifications
- SMS alerts (optional)
- Multi-channel delivery system

✅ **Academic Management**

- Grade management and result publication
- Course and timetable management
- Report card generation
- Parent portal for monitoring

✅ **Security**

- JWT authentication with refresh tokens
- 2FA (Two-Factor Authentication)
- Role-based access control
- Data encryption at rest and in transit
- Rate limiting and DDoS protection

✅ **Zero-Cost Hosting**

- Frontend: Vercel (Free)
- Backend: Render (Free)
- Database: Supabase (Free)
- Notifications: Firebase (Free)
- CDN: Cloudflare (Free)

### Success Metrics

**Technical KPIs:**

- API response time < 200ms (95% of requests)
- Notification delivery < 30 seconds (95% of notifications)
- WebSocket uptime > 99%
- Mobile app crash rate < 1%
- System uptime > 99.5%

**Business KPIs:**

- User adoption rate > 80% (within first month)
- Parent engagement rate > 85%
- Teacher punctuality improvement by 30%
- Reduction in administrative work by 60%
- Notification opt-in rate > 70%

---

## Project Overview

### Problem Statement

Schools worldwide struggle with:

1. **Manual Attendance Tracking**

   - Time-consuming roll calls
   - Human errors in marking
   - Delayed parent notifications
   - Difficult to track patterns
2. **Teacher Punctuality Monitoring**

   - No automated tracking system
   - Manual sign-in sheets easily manipulated
   - Difficult to calculate punctuality metrics
   - No real-time alerts for late arrivals
3. **Paper-Based Record Keeping**

   - Storage challenges
   - Risk of data loss
   - Difficult to retrieve information
   - Environmental impact
4. **Poor Communication**

   - Delayed grade updates
   - Parents unaware of child's attendance
   - Announcements don't reach everyone
   - No centralized communication platform
5. **High Operational Costs**

   - Expensive software licenses
   - High hosting costs
   - Maintenance fees
   - IT infrastructure expenses

### Our Solution

A comprehensive digital platform that:

✅ **Automates Attendance**

- Biometric device integration
- Real-time check-in/check-out
- Automatic status calculation (on-time, late, absent)
- Instant notifications to parents

✅ **Tracks Teacher Attendance & Punctuality**

- Automated teacher check-in system
- Punctuality score calculation
- Late arrival alerts to administrators
- Monthly performance reports
- Leave management workflow

✅ **Manages Academic Records Digitally**

- Centralized student database
- Grade entry and calculation
- Report card generation
- Performance analytics
- Secure cloud storage

✅ **Enables Real-Time Communication**

- Push notifications to mobile devices
- Email alerts
- SMS notifications (optional)
- In-app announcements
- Parent-teacher messaging

✅ **Operates at Zero Cost**

- Strategic use of free-tier services
- No monthly hosting fees
- No database costs
- No CDN charges
- Scales to 500+ users on free tier

### Target Users

#### 1. Administrators (School Management)

**Responsibilities:**

- System configuration and management
- User account creation and management
- Attendance oversight and reports
- Academic planning and scheduling
- Performance monitoring and analytics

**Features:**

- Complete system access
- Real-time dashboards
- Comprehensive reports
- User management
- Teacher punctuality monitoring
- Student performance analytics

#### 2. Teachers (Academic Staff)

**Responsibilities:**

- Self-attendance check-in/check-out
- Mark student attendance
- Enter and publish grades
- Manage class schedules
- Request and track leave
- Communicate with parents

**Features:**

- Teacher self-service portal
- Attendance marking interface
- Grade management system
- Class management tools
- Leave request system
- Personal performance dashboard

#### 3. Students

**Responsibilities:**

- Check attendance records
- View grades and results
- Access class schedules
- Receive notifications
- Track academic progress

**Features:**

- Personal dashboard
- Attendance history
- Grade viewer
- Schedule calendar
- Notification center
- Report card access

#### 4. Parents/Guardians

**Responsibilities:**

- Monitor child's attendance
- Track academic performance
- Respond to notifications
- Communicate with teachers
- Download report cards

**Features:**

- Real-time attendance alerts
- Grade notifications
- Performance dashboard
- Communication portal
- Report card downloads
- Multi-child management

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├──────────────────┬──────────────────┬───────────────────────────┤
│   Web App        │  Mobile App      │  Admin Dashboard          │
│   (React)        │  (React Native)  │  (React)                  │
│   Vercel Free    │  iOS + Android   │  Vercel Free              │
└────────┬─────────┴────────┬─────────┴──────────┬────────────────┘
         │                  │                     │
         └──────────────────┼─────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   Cloudflare   │
                    │   CDN + WAF    │
                    │   DDoS Shield  │
                    └───────┬────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
┌────────▼────────┐ ┌──────▼──────┐  ┌────────▼────────┐
│   REST API      │ │  WebSocket  │  │   Firebase      │
│   Express.js    │ │  Socket.io  │  │   FCM + Auth    │
│   Node.js 18+   │ │  Real-time  │  │   Free Tier     │
│   Render Free   │ │  Updates    │  │   Unlimited     │
└────────┬────────┘ └──────┬──────┘  └─────────────────┘
         │                  │
         └──────────────────┼──────────────────┐
                            │                  │
                    ┌───────▼────────┐ ┌───────▼────────┐
                    │   PostgreSQL   │ │     Redis      │
                    │   Supabase     │ │    Upstash     │
                    │   500MB Free   │ │  10K cmd/day   │
                    │   Row Security │ │   Sessions     │
                    └────────┬───────┘ └────────────────┘
                             │
                    ┌────────▼────────┐
                    │  File Storage   │
                    │  Cloudflare R2  │
                    │   10GB Free     │
                    │   S3 Compatible │
                    └─────────────────┘
```

### Component Architecture

#### 1. Frontend Layer

##### Web Application (React)

**Core Technologies:**

- **Framework:** React 18+ with Hooks
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI (MUI)
- **Routing:** React Router v6
- **Real-time:** Socket.io Client
- **Notifications:** Web Push API + FCM
- **Forms:** React Hook Form + Yup
- **Charts:** Recharts
- **Hosting:** Vercel (Free - Unlimited bandwidth)

**Key Features:**

- Progressive Web App (PWA) capabilities
- Offline support with Service Workers
- Real-time updates via WebSocket
- Push notifications
- Responsive design (mobile-first)
- Dark mode support
- Multi-language ready

**Folder Structure:**

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── attendance/
│   │   ├── grades/
│   │   └── notifications/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   ├── Students/
│   │   └── Teachers/
│   ├── services/
│   │   ├── api.js
│   │   ├── socket.js
│   │   └── firebase.js
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   ├── utils/
│   └── App.js
└── package.json
```

##### Mobile Application (React Native)

**Core Technologies:**

- **Framework:** React Native 0.73+
- **Navigation:** React Navigation 6
- **State Management:** Redux Toolkit
- **UI Components:** React Native Paper
- **Push Notifications:** Firebase Cloud Messaging
- **Local Storage:** AsyncStorage / MMKV
- **Biometric Auth:** react-native-biometrics
- **Secure Storage:** react-native-keychain

**Key Features:**

- Native iOS and Android apps
- Push notifications
- Biometric authentication (Face ID, Fingerprint)
- Offline data synchronization
- Deep linking
- Background notification handling
- Camera integration (for documents)
- QR code scanning

**Folder Structure:**

```
mobile/
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   ├── store/
│   ├── utils/
│   └── App.js
└── package.json
```

#### 2. Backend Layer

##### REST API (Express.js/Node.js)

**Core Technologies:**

- **Framework:** Express.js 4.18+
- **Runtime:** Node.js 18+ LTS
- **ORM:** Prisma (Type-safe database access)
- **Authentication:** JWT + Refresh Tokens
- **Validation:** Express Validator
- **Rate Limiting:** Express Rate Limit
- **Security:** Helmet.js
- **CORS:** Configurable whitelist
- **Logging:** Winston
- **Error Tracking:** Sentry

**API Features:**

- RESTful architecture
- JWT authentication with rotation
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting per endpoint
- API documentation (Swagger/OpenAPI)
- Error handling middleware
- Audit logging
- Request/response compression
- CORS protection

**Folder Structure:**

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   ├── gradeController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   ├── grades.js
│   │   └── notifications.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   └── firebaseService.js
│   ├── utils/
│   │   ├── encryption.js
│   │   ├── logger.js
│   │   └── auditLog.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── tests/
├── .env.example
└── package.json
```

##### WebSocket Server (Socket.io)

**Core Technologies:**

- **Framework:** Socket.io 4.6+
- **Integration:** Same Node.js server as REST API

**Features:**

- Real-time attendance updates
- Live notifications
- Connection pooling
- Auto-reconnection
- Room-based broadcasting
- Event-driven architecture
- Authentication via JWT
- Namespace separation

**Event Types:**

- `attendance:student:checkin`
- `attendance:student:checkout`
- `attendance:teacher:late`
- `grade:posted`
- `notification:new`
- `announcement:broadcast`

#### 3. Data Layer

##### PostgreSQL Database (Supabase)

**Provider:** Supabase (Free tier)

**Specifications:**

- **Storage:** 500 MB database
- **Bandwidth:** 2 GB/month
- **Connections:** Up to 2 concurrent connections

**Features:**

- Relational database (PostgreSQL 15+)
- Row-level security (RLS)
- Automatic daily backups
- Connection pooling
- Database migrations (Prisma)
- Real-time subscriptions
- RESTful API auto-generated
- PostgREST integration

**Why Supabase?**

- Free tier is generous for small-medium schools
- Built-in row-level security
- Automatic backups
- Easy migration path to paid tier
- Excellent documentation
- Open source

##### Redis Cache (Upstash)

**Provider:** Upstash (Free tier)

**Specifications:**

- **Commands:** 10,000/day
- **Storage:** 256 MB
- **Connections:** 100 concurrent

**Use Cases:**

- Session storage (JWT refresh tokens)
- Notification queues (Bull)
- Rate limiting data
- Temporary cache (API responses)
- WebSocket connection management
- Real-time data aggregation

**Why Upstash?**

- Serverless Redis (pay per use)
- Free tier sufficient for small schools
- Low latency
- Easy integration
- REST API available

##### File Storage (Cloudflare R2)

**Provider:** Cloudflare R2 (Free tier)

**Specifications:**

- **Storage:** 10 GB
- **Class A Operations:** 10M/month (writes)
- **Class B Operations:** 100M/month (reads)

**Use Cases:**

- Student photos
- Teacher documents
- Report cards (PDF)
- Certificates
- Uploaded assignments
- Attendance reports
- Biometric templates (encrypted)

**Alternative:** Supabase Storage (1 GB free)

**Why Cloudflare R2?**

- S3 compatible API
- No egress fees (unlike AWS S3)
- Global CDN included
- Fast upload/download
- Generous free tier

#### 4. External Services

##### Firebase (Google)

**Services Used:**

- Cloud Messaging (FCM) - Unlimited free
- Authentication (optional)
- Analytics
- Hosting (10 GB/month free)

**Use Cases:**

- Push notifications to mobile devices
- Web push notifications
- User analytics
- A/B testing
- Remote config

**Why Firebase?**

- FCM is the industry standard for mobile notifications
- Completely free (no limits on FCM)
- Excellent documentation
- Easy integration
- Works on both iOS and Android

##### Email Service

**Option A: Resend (Recommended)**

- **Free Tier:** 3,000 emails/month, 100/day
- **Features:** Modern API, good deliverability
- **Use Cases:** All transactional emails

**Option B: SendGrid**

- **Free Tier:** 100 emails/day
- **Features:** Established provider, reliable
- **Use Cases:** Backup email service

**Email Types:**

- Welcome emails
- Password reset
- Attendance notifications (daily digest)
- Grade notifications
- Weekly summaries
- Emergency alerts

##### SMS Service (Optional)

**Provider:** Twilio

**Free Tier:** $15 trial credit

**Use Cases:**

- Critical alerts only
- 2FA codes
- Emergency notifications
- Principal override alerts

**Note:** SMS is optional - can operate with email/push only

##### Cloudflare

**Services:** CDN, DDoS Protection, WAF, SSL

**Free Tier Features:**

- Unlimited bandwidth
- Global CDN
- DDoS protection
- Web Application Firewall (limited rules)
- SSL/TLS certificates (Let's Encrypt)
- DNS management
- Page caching
- Image optimization

**Why Cloudflare?**

- Industry-leading CDN
- Excellent free tier
- DDoS protection included
- Easy to configure
- Improves site performance significantly

---

## Technology Stack

### Complete Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
├──────────────────────┬──────────────────────────────────┤
│   Web (React)        │   Mobile (React Native)          │
├──────────────────────┼──────────────────────────────────┤
│ • React 18+          │ • React Native 0.73+             │
│ • Redux Toolkit      │ • React Navigation 6             │
│ • Material-UI        │ • React Native Paper             │
│ • Socket.io Client   │ • Firebase Messaging             │
│ • Axios              │ • React Native Biometrics        │
│ • Recharts           │ • AsyncStorage/MMKV              │
└──────────────────────┴──────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   Cloudflare   │
                    │   (Free CDN)   │
                    └───────┬────────┘
                            │
┌───────────────────────────▼──────────────────────────────┐
│                    BACKEND LAYER                          │
├──────────────────────┬──────────────────────────────────┤
│   API (Express)      │   Real-time (Socket.io)          │
├──────────────────────┼──────────────────────────────────┤
│ • Node.js 18+        │ • Socket.io 4.6+                 │
│ • Express.js 4.18+   │ • JWT Authentication             │
│ • Prisma ORM         │ • Room-based Broadcasting        │
│ • JWT + Bcrypt       │ • Auto-reconnection              │
│ • Helmet.js          │ • Event-driven                   │
│ • Express Validator  │                                  │
└──────────────────────┴──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼──────┐
│  PostgreSQL    │  │     Redis      │  │   Firebase  │
│  (Supabase)    │  │   (Upstash)    │  │    (FCM)    │
├────────────────┤  ├────────────────┤  ├─────────────┤
│ • 500MB Free   │  │ • 10K cmd/day  │  │ • Unlimited │
│ • Prisma ORM   │  │ • Sessions     │  │ • Push      │
│ • Row Security │  │ • Queues       │  │ • Analytics │
└────────────────┘  └────────────────┘  └─────────────┘
```

### Frontend Web Stack

**package.json**

```json
{
  "name": "school-admin-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "react-hook-form": "^7.49.0",
    "yup": "^1.3.0",
    "recharts": "^2.10.0",
    "date-fns": "^3.0.0",
    "react-toastify": "^9.1.0",
    "firebase": "^10.7.0",
    "jwt-decode": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

### Frontend Mobile Stack

**package.json**

```json
{
  "name": "school-admin-mobile",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-native-paper": "^5.11.0",
    "react-native-vector-icons": "^10.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "@react-native-firebase/app": "^19.0.0",
    "@react-native-firebase/messaging": "^19.0.0",
    "@notifee/react-native": "^7.8.0",
    "react-native-keychain": "^8.1.0",
    "react-native-biometrics": "^3.0.0",
    "@react-native-async-storage/async-storage": "^1.21.0"
  }
}
```

### Backend API Stack

**package.json**

```json
{
  "name": "school-admin-api",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.0",
    "rate-limit-redis": "^4.2.0",
    "express-validator": "^7.0.0",
    "socket.io": "^4.6.0",
    "ioredis": "^5.3.0",
    "bull": "^4.12.0",
    "firebase-admin": "^12.0.0",
    "nodemailer": "^6.9.0",
    "resend": "^3.0.0",
    "winston": "^3.11.0",
    "crypto-js": "^4.2.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "@sentry/node": "^7.91.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0"
  }
}
```

### Data Flow Architecture

#### 1. Student Attendance Flow

```
Biometric Device → API Endpoint → Database
                      ↓
                  Calculate Status (On-time/Late/Absent)
                      ↓
                  WebSocket Broadcast → Parents (Real-time)
                      ↓
                  Notification Queue → Email/SMS/Push
```

#### 2. Teacher Punctuality Flow

```
Teacher Check-in → API → Compare with Shift Time
                            ↓
                      Calculate Late Minutes
                            ↓
                      Update Punctuality Stats
                            ↓
                   Late? → Admin Alert (WebSocket)
                            ↓
                      Store in Database
```

#### 3. Grade Publication Flow

```
Teacher Posts Grade → API → Database
                               ↓
                          Publish Flag Set?
                               ↓
                          YES → Notification Queue
                               ↓
                    Students + Parents (Push + Email)
                               ↓
                          WebSocket Update
```

### Zero-Cost Hosting Breakdown

| Service                      | Provider      | Free Tier            | Use Case                       |
| ---------------------------- | ------------- | -------------------- | ------------------------------ |
| **Frontend Web**       | Vercel        | Unlimited bandwidth  | React app hosting              |
| **Backend API**        | Render        | 750 hours/month      | Express.js API                 |
| **Database**           | Supabase      | 500MB, 2GB bandwidth | PostgreSQL                     |
| **Cache/Queue**        | Upstash       | 10K commands/day     | Redis                          |
| **File Storage**       | Cloudflare R2 | 10GB storage         | Student photos, documents      |
| **Push Notifications** | Firebase      | Unlimited            | FCM for mobile/web             |
| **Email**              | Resend        | 3000/month           | Transactional emails           |
| **CDN**                | Cloudflare    | Unlimited            | Static assets, DDoS protection |
| **Monitoring**         | UptimeRobot   | 50 monitors          | Uptime monitoring              |
| **Error Tracking**     | Sentry        | 5K events/month      | Error logging                  |

**Total Monthly Cost: $0**

**Scaling Path:**

- Up to 500 users: Completely free
- 500-1000 users: ~$50/month (upgrade Render + Supabase)
- 1000+ users: ~$100-150/month

---

## Next Steps

This completes Part 1 of the documentation. Continue to:

- **Part 2:** Database Schema and API Documentation
- **Part 3:** Security Implementation
- **Part 4:** Development Phases (Week-by-Week)
- **Part 5:** Deployment Guide
- **Part 6:** Testing, Maintenance, and User Guides

---

**Document Version:** 1.0.0
**Last Updated:** January 26, 2025
**Next Document:** [02 - Database and API Documentation](02-database-and-api.md)
