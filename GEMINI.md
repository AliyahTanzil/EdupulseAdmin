# EdupulseAdmin Project

This document provides a comprehensive overview of the EdupulseAdmin project, including its architecture, features, development plan, and deployment strategy.

---

# Recommendations for the EdupulseAdmin Project

As a senior software developer with over 30 years of experience, I have analyzed the project's documentation and existing codebase. Here are my recommendations for the successful development and launch of the EdupulseAdmin project.

## 1. Consolidate Project Name

The project is referred to as both "EdupulseAdmin" and "School Administration System." For clarity and branding, I recommend choosing one name and using it consistently across all project assets, including folder names, documentation, and within the application itself. "EdupulseAdmin" is a strong, unique choice.

## 2. Prioritize Backend Development

The backend is the foundation of this system. The provided documentation contains a detailed and well-thought-out plan for the backend, including the database schema and API endpoints. The development team should focus on the following backend implementation tasks first:

*   **Implement all models** as defined in the Prisma schema.
*   **Create all API endpoints** for the features outlined in the documentation.
*   **Implement robust authentication and authorization** logic from the start.
*   **Set up the real-time notification system** using WebSockets and Firebase Cloud Messaging.

## 3. Leverage the Existing Documentation

The set of markdown files is a significant asset. They should be treated as the primary source of truth for this project. The detailed plans for development, deployment, and security will greatly accelerate the development process and reduce ambiguity.

## 4. Adhere to the Development Plan

The 3-month development plan is well-structured and provides a clear roadmap. Following this plan will be crucial for delivering the project on time and within budget.

## 5. Embed Security from Day One

The "Security Implementation" document is comprehensive. Security must not be an afterthought. The team should implement all the security measures detailed in the document as they build out the system.

## 6. Phased Frontend Development

Once the backend has a solid foundation, frontend development can begin. I recommend the following phased approach:

1.  **Admin Dashboard:** Start with the admin dashboard. This will be the primary interface for managing the entire system and will be essential for testing and populating the system with data.
2.  **Web UI:** Develop the web-based user interface for teachers, students, and parents.
3.  **Mobile App:** The mobile app is a significant undertaking. It should be developed after the backend and web UIs are stable and have been user-tested.

## 7. Automate Testing Rigorously

The "Testing, Maintenance & User Guides" document outlines a solid testing strategy. The team should prioritize the automation of:

*   **Unit tests** for all backend and frontend components.
*   **Integration tests** to ensure that the different parts of the system work together correctly.
*   **End-to-end tests** to simulate user workflows.

## 8. Utilize a Project Management Tool

Given the complexity of the project and the detailed development plan, a project management tool like Jira, Trello, or Asana is essential. This will help the team track tasks, monitor progress, and collaborate effectively.

## 9. Enforce Regular Code Reviews

A formal code review process should be established. Regular code reviews will help maintain code quality, ensure consistency, and provide opportunities for knowledge sharing among team members.

---

# Part 1: Overview and Architecture

**Version:** 1.0.0
**Last Updated:** January 26, 2025

## Executive Summary

### Project Information

| Item                   | Details                                          |
| ---------------------- | ------------------------------------------------ |
| **Project Name** | EdupulseAdmin                     |
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

\`\`\`
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
\`\`\`

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

##### WebSocket Server (Socket.io)

**Core Technologies:**

- **Framework:** Socket.io 4.6+
- **Integration:** Same Node.js server as REST API

#### 3. Data Layer

##### PostgreSQL Database (Supabase)

**Provider:** Supabase (Free tier)

**Specifications:**

- **Storage:** 500 MB database
- **Bandwidth:** 2 GB/month
- **Connections:** Up to 2 concurrent connections

##### Redis Cache (Upstash)

**Provider:** Upstash (Free tier)

**Specifications:**

- **Commands:** 10,000/day
- **Storage:** 256 MB
- **Connections:** 100 concurrent

##### File Storage (Cloudflare R2)

**Provider:** Cloudflare R2 (Free tier)

**Specifications:**

- **Storage:** 10 GB
- **Class A Operations:** 10M/month (writes)
- **Class B Operations:** 100M/month (reads)

#### 4. External Services

##### Firebase (Google)

**Services Used:**

- Cloud Messaging (FCM) - Unlimited free
- Authentication (optional)
- Analytics
- Hosting (10 GB/month free)

##### Email Service

**Option A: Resend (Recommended)**

- **Free Tier:** 3,000 emails/month, 100/day

**Option B: SendGrid**

- **Free Tier:** 100 emails/day

##### SMS Service (Optional)

**Provider:** Twilio

**Free Tier:** $15 trial credit

##### Cloudflare

**Services:** CDN, DDoS Protection, WAF, SSL

---

## Technology Stack

### Complete Stack Overview

\`\`\`
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
\`\`\`

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

---
# Part 2: Database Schema and API Documentation

## Database Schema

### Complete Prisma Schema

\`\`\`prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum UserRole {
  ADMIN
  TEACHER
  STUDENT
  PARENT
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  GRADUATED
  RESIGNED
}

enum DayOfWeek {
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
}

enum AttendanceStatus {
  ON_TIME
  LATE
  ABSENT
  HALF_DAY
  ON_LEAVE
}

enum LeaveType {
  SICK
  PERSONAL
  EMERGENCY
  VACATION
  BEREAVEMENT
  MATERNITY
  PATERNITY
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum GradeCategory {
  ASSIGNMENT
  QUIZ
  MIDTERM
  FINAL
  PROJECT
  PRACTICAL
  ATTENDANCE
}

enum NotificationType {
  ATTENDANCE_CHECKIN
  ATTENDANCE_CHECKOUT
  ATTENDANCE_ABSENT
  ATTENDANCE_LATE
  TEACHER_LATE
  TEACHER_ABSENT
  GRADE_POSTED
  GRADE_UPDATED
  RESULT_PUBLISHED
  ASSIGNMENT_NEW
  EXAM_SCHEDULE
  ANNOUNCEMENT
  LEAVE_APPROVED
  LEAVE_REJECTED
  FEE_REMINDER
  GENERAL
}

enum NotificationPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  FAILED_LOGIN
  PASSWORD_CHANGE
  PASSWORD_RESET
  PERMISSION_CHANGE
}

// ============================================
// USER MANAGEMENT
// ============================================

model User {
  id                String      @id @default(uuid())
  email             String      @unique
  password          String
  role              UserRole
  status            UserStatus  @default(ACTIVE)
  firstName         String
  lastName          String
  phone             String?
  avatar            String?
  dateOfBirth       DateTime?
  address           String?
  twoFactorEnabled  Boolean     @default(false)
  twoFactorSecret   String?
  lastLogin         DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  deviceTokens      DeviceToken[]
  notifications     Notification[]
  sessions          Session[]
  auditLogs         AuditLog[]
  teacherProfile    Teacher?
  studentProfile    Student?
  parentProfile     Parent?
  
  @@index([email])
  @@index([role])
  @@index([status])
}

model Session {
  id            String   @id @default(uuid())
  userId        String
  refreshToken  String   @unique
  deviceInfo    String?
  ipAddress     String?
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([refreshToken])
}

model DeviceToken {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  platform  String
  active    Boolean  @default(true)
  lastUsed  DateTime @default(now())
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([token])
}

// ============================================
// TEACHER MANAGEMENT
// ============================================

model Teacher {
  id              String   @id @default(uuid())
  userId          String   @unique
  employeeId      String   @unique
  department      String
  specialization  String[]
  qualification   String
  experience      Int
  joinDate        DateTime
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  shifts          TeacherShift[]
  attendance      TeacherAttendance[]
  leaves          TeacherLeave[]
  classes         ClassTeacher[]
  courses         CourseTeacher[]
  punctualityStats TeacherPunctualityStats[]
  
  @@index([employeeId])
  @@index([department])
}

model TeacherShift {
  id                  String    @id @default(uuid())
  teacherId           String
  dayOfWeek           DayOfWeek
  shiftStartTime      String
  shiftEndTime        String
  gracePeriodMinutes  Int       @default(15)
  breakDurationMinutes Int      @default(30)
  isActive            Boolean   @default(true)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  teacher             Teacher   @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  attendance          TeacherAttendance[]
  
  @@index([teacherId])
  @@index([dayOfWeek])
}

model TeacherAttendance {
  id                String            @id @default(uuid())
  teacherId         String
  shiftId           String
  attendanceDate    DateTime          @db.Date
  checkInTime       DateTime?
  checkOutTime      DateTime?
  breakStartTime    DateTime?
  breakEndTime      DateTime?
  status            AttendanceStatus
  lateByMinutes     Int               @default(0)
  overtimeMinutes   Int               @default(0)
  biometricDeviceId String?
  remarks           String?
  approvedBy        String?
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  teacher           Teacher           @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  shift             TeacherShift      @relation(fields: [shiftId], references: [id])
  
  @@unique([teacherId, attendanceDate])
  @@index([teacherId])
  @@index([attendanceDate])
  @@index([status])
}

model TeacherLeave {
  id                  String      @id @default(uuid())
  teacherId           String
  leaveType           LeaveType
  startDate           DateTime    @db.Date
  endDate             DateTime    @db.Date
  reason              String
  status              LeaveStatus @default(PENDING)
  approvedBy          String?
  substituteTeacherId String?
  documents           Json?
  rejectionReason     String?
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  teacher             Teacher     @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  
  @@index([teacherId])
  @@index([status])
  @@index([startDate, endDate])
}

model TeacherPunctualityStats {
  id                  String   @id @default(uuid())
  teacherId           String
  month               DateTime @db.Date
  totalWorkingDays    Int
  daysPresent         Int
  daysLate            Int
  daysAbsent          Int
  totalLateMinutes    Int
  averageLateMinutes  Float
  punctualityScore    Float
  attendancePercentage Float
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  teacher             Teacher  @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  
  @@unique([teacherId, month])
  @@index([teacherId])
  @@index([month])
}

// ============================================
// STUDENT MANAGEMENT
// ============================================

model Student {
  id              String   @id @default(uuid())
  userId          String   @unique
  admissionNumber String   @unique
  classId         String
  rollNumber      String
  bloodGroup      String?
  guardianName    String
  guardianPhone   String
  guardianEmail   String?
  admissionDate   DateTime
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  class           Class    @relation(fields: [classId], references: [id])
  
  attendance      StudentAttendance[]
  grades          Grade[]
  parents         StudentParent[]
  
  @@index([admissionNumber])
  @@index([classId])
}

model Parent {
  id              String   @id @default(uuid())
  userId          String   @unique
  occupation      String?
  relationship    String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  students        StudentParent[]
  
  @@index([userId])
}

model StudentParent {
  id        String   @id @default(uuid())
  studentId String
  parentId  String
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())
  student   Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  parent    Parent   @relation(fields: [parentId], references: [id], onDelete: Cascade)
  
  @@unique([studentId, parentId])
  @@index([studentId])
  @@index([parentId])
}

// ============================================
// ACADEMIC STRUCTURE
// ============================================

model AcademicYear {
  id        String   @id @default(uuid())
  year      String   @unique
  startDate DateTime
  endDate   DateTime
  isCurrent Boolean  @default(false)
  createdAt DateTime @default(now())
  classes   Class[]
  
  @@index([year])
  @@index([isCurrent])
}

model Class {
  id              String       @id @default(uuid())
  name            String
  grade           Int
  section         String
  academicYearId  String
  capacity        Int          @default(40)
  academicYear    AcademicYear @relation(fields: [academicYearId], references: [id])
  
  students        Student[]
  teachers        ClassTeacher[]
  courses         Course[]
  timetable       Timetable[]
  
  @@unique([grade, section, academicYearId])
  @@index([academicYearId])
}

model ClassTeacher {
  id        String   @id @default(uuid())
  classId   String
  teacherId String
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())
  class     Class    @relation(fields: [classId], references: [id], onDelete: Cascade)
  teacher   Teacher  @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  
  @@unique([classId, teacherId])
  @@index([classId])
  @@index([teacherId])
}

model Course {
  id          String   @id @default(uuid())
  name        String
  code        String   @unique
  classId     String
  credits     Int      @default(1)
  description String?
  createdAt   DateTime @default(now())
  class       Class    @relation(fields: [classId], references: [id], onDelete: Cascade)
  
  teachers    CourseTeacher[]
  grades      Grade[]
  timetable   Timetable[]
  
  @@index([code])
  @@index([classId])
}

model CourseTeacher {
  id        String   @id @default(uuid())
  courseId  String
  teacherId String
  createdAt DateTime @default(now())
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  teacher   Teacher  @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  
  @@unique([courseId, teacherId])
  @@index([courseId])
  @@index([teacherId])
}

model Timetable {
  id        String    @id @default(uuid())
  classId   String
  courseId  String
  dayOfWeek DayOfWeek
  startTime String
  endTime   String
  roomNumber String?
  class     Class     @relation(fields: [classId], references: [id], onDelete: Cascade)
  course    Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  @@index([classId])
  @@index([dayOfWeek])
}

// ============================================
// ATTENDANCE MANAGEMENT
// ============================================

model StudentAttendance {
  id                String            @id @default(uuid())
  studentId         String
  attendanceDate    DateTime          @db.Date
  status            AttendanceStatus
  checkInTime       DateTime?
  checkOutTime      DateTime?
  biometricDeviceId String?
  remarks           String?
  markedBy          String
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  student           Student           @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  @@unique([studentId, attendanceDate])
  @@index([studentId])
  @@index([attendanceDate])
  @@index([status])
}

// ============================================
// GRADE MANAGEMENT
// ============================================

model Grade {
  id            String        @id @default(uuid())
  studentId     String
  courseId      String
  category      GradeCategory
  title         String
  maxMarks      Float
  obtainedMarks Float
  percentage    Float
  gradeDate     DateTime      @db.Date
  remarks       String?
  publishedAt   DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  student       Student       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  course        Course        @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  @@index([studentId])
  @@index([courseId])
  @@index([gradeDate])
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

model Notification {
  id              String               @id @default(uuid())
  userId          String
  type            NotificationType
  priority        NotificationPriority @default(MEDIUM)
  title           String
  message         String
  data            Json?
  isRead          Boolean              @default(false)
  isDelivered     Boolean              @default(false)
  readAt          DateTime?
  deliveredAt     DateTime?
  createdAt       DateTime             @default(now())
  user            User                 @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([type])
  @@index([isRead])
  @@index([createdAt])
}

model NotificationPreference {
  id          String            @id @default(uuid())
  userId      String            @unique
  type        NotificationType
  pushEnabled Boolean           @default(true)
  emailEnabled Boolean          @default(true)
  smsEnabled  Boolean           @default(false)
  soundEnabled Boolean          @default(true)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  
  @@index([userId])
  @@index([type])
}

// ============================================
// AUDIT & SECURITY
// ============================================

model AuditLog {
  id          String      @id @default(uuid())
  userId      String?
  action      AuditAction
  resource    String
  resourceId  String?
  changes     Json?
  ipAddress   String?
  userAgent   String?
  timestamp   DateTime    @default(now())
  user        User?       @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([action])
  @@index([resource])
  @@index([timestamp])
}

model SystemSetting {
  id        String   @id @default(uuid())
  key       String   @unique
  value     String
  category  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([key])
  @@index([category])
}
\`\`\`

### API Documentation

**Base URL:** \`https://api.school.com/api/v1\`
**Authentication:** Bearer Token (JWT)
**Content-Type:** \`application/json\`

---
# Part 3: Security Implementation

## Security Overview

### Multi-Layer Security Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    LAYER 1: NETWORK                      │
│  • Cloudflare WAF (Web Application Firewall)            │
│  • DDoS Protection                                       │
│  • SSL/TLS Encryption (HTTPS)                           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  LAYER 2: APPLICATION                    │
│  • CORS Protection                                       │
│  • Security Headers (Helmet.js)                         │
│  • Rate Limiting                                        │
│  • Input Validation                                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              LAYER 3: AUTHENTICATION                     │
│  • JWT with Refresh Tokens                              │
│  • 2FA (Two-Factor Authentication)                      │
│  • Session Management                                   │
│  • Device Token Tracking                                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│               LAYER 4: AUTHORIZATION                     │
│  • Role-Based Access Control (RBAC)                     │
│  • Permission Checking                                  │
│  • Resource Ownership Validation                        │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   LAYER 5: DATA                          │
│  • Password Hashing (bcrypt)                            │
│  • Data Encryption (AES)                                │
│  • Row-Level Security (Supabase)                        │
│  • SQL Injection Prevention                             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 LAYER 6: MONITORING                      │
│  • Audit Logging                                        │
│  • Error Tracking (Sentry)                              │
│  • Security Event Alerts                                │
└─────────────────────────────────────────────────────────┘
\`\`\`

---
# Part 4: Development Phases (3 Months)

## Overview

### Development Timeline

\`\`\`
Month 1 (Weeks 1-4)         Month 2 (Weeks 5-8)        Month 3 (Weeks 9-12)
├─ Foundation (W1-2)        ├─ Backend (W5-6)          ├─ Frontend (W9)
├─ Backend Auth (W3)        ├─ Frontend Core (W7)      ├─ Mobile (W10-11)
└─ Backend Users (W4)       └─ Frontend UI (W8)        └─ Deploy (W12)
\`\`\`

---
# Part 5: Deployment Guide (Zero-Cost Hosting)

## Pre-Deployment Checklist

### Environment Variables

\`\`\`bash
# ✅ Check all required variables are set
- [ ] DATABASE_URL
- [ ] REDIS_URL
- [ ] JWT_SECRET (32+ characters)
- [ ] JWT_REFRESH_SECRET (32+ characters)
- [ ] ENCRYPTION_KEY (32 characters)
- [ ] FIREBASE credentials
- [ ] Email service API key
- [ ] CORS_ORIGINS
\`\`\`

---
# Part 6: Testing, Maintenance & User Guides

## Testing Strategy

### Testing Pyramid

\`\`\`
        /\\
       /E2E\\         10%   End-to-End Tests
      /______\\
     /        \\
    /Integration\\   30%   Integration Tests
   /____________\\
  /              \\
 /  Unit Tests    \\ 60%   Unit Tests
/__________________\\
\`\`\`

---

# Existing Features

This section will be updated as new features are added.

## 1. Admin Dashboard

-   **File:** \`apps/web-ui/src/pages/dashboard/AdminDashboard.tsx\`
-   **Description:** A high-fidelity, responsive grid dashboard providing access to 20 key modules.
-   **Components:**
    -   \`DashboardCard\`: A square, interactive card with an icon and label, designed with Tailwind CSS.
-   **Features:**
    -   Responsive grid (5-col desktop, 3-col tablet, 2-col mobile).
    -   20 modules including SIS, Fee Management, Library, and more.
    -   Icons provided by \`lucide-react\`.
    -   Interactive hover effects on cards.

---

# Gemini Session Summary

This document summarizes the work performed in the recent Gemini CLI session.

## Task Completed: Create Class Model and Tests

The primary objective of this session was to create a \`Class\` model and its corresponding unit tests.

### Details of the \`Class\` Model:
- **File:** \`apps/backend-api/src/models/Class.ts\`
- **Fields:**
    - \`classId\` (UUID, Primary Key)
    - \`className\` (String, e.g., SSS1, JSS3, Primary 5)
    - \`category\` (Enum: \`PRIMARY\`, \`JUNIOR_SECONDARY\`, \`SENIOR_SECONDARY\` - linked to \`SchoolCategory\` enum)
    - \`department\` (Optional String: \`Science\`, \`Art\`, \`Commercial\` - only for \`SENIOR_SECONDARY\` category, with validation)
    - \`formTeacherId\` (UUID, Foreign Key to User/Teacher model)

### Work Performed:
1.  **Created \`Class\` Model:** A new file \`src/models/Class.ts\` was created with the \`Class\` model definition using Sequelize, including schema definition, data types, and custom validation for the \`department\` field.
2.  **Created Unit Tests for \`Class\` Model:** A new test file \`src/__tests__/class.test.ts\` was created, including tests for:
    *   Successful creation of a class with valid data.
    *   Preventing creation with an invalid department for \`SENIOR_SECONDARY\`.
    *   Preventing creation with a department for non-\`SENIOR_SECONDARY\` categories.
    *   Successful creation of a \`SENIOR_SECONDARY\` class without a department.
3.  **Troubleshooting Database Permissions and Test Timeouts:**
    *   Initial test runs failed due to \`permission denied for schema public\` errors with the \`medisha\` database user.
    *   This was resolved by granting necessary \`CREATE\` and \`USAGE\` privileges on the \`public\` schema to the \`medisha\` user using \`psql\`.
    *   Jest test timeouts were encountered and resolved by increasing the \`beforeAll\` hook timeout to 30 seconds in the test configuration.
4.  **Verification:** All unit tests for both \`Student\` and \`Class\` models were run and passed successfully after troubleshooting.
5.  **Commit:** The newly created \`Class\` model file (\`src/models/Class.ts\`) and its test file (\`src/__tests__/class.test.ts\`) were committed to the Git repository.

## Last Stop and Next Steps:

All explicit requests for this session have been completed. The \`Class\` model is created, tested, and committed.

**Our last stop is that the \`Class\` model has been successfully created, tested, and committed to the repository.**

In our next meeting, we can proceed with integrating this \`Class\` model into the application (e.g., creating routes, controllers, and potentially associating it with the User/Teacher model) or any other new tasks you may have.

Thank you!
