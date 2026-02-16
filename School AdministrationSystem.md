---
noteId: "95cea5b00b6011f1940c7b1c911d6a2f"
tags: []
---

# School Administration System

## Part 2: Database Schema and API Documentation

**Version:** 1.0.0
**Last Updated:** January 26, 2025
**Document:** 2 of 6

---

## Table of Contents

1. [Database Schema](#database-schema)
2. [API Documentation](#api-documentation)
3. [WebSocket Events](#websocket-events)

---

## Database Schema

### Complete Prisma Schema

```prisma
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
```

### Database Migrations

```bash
# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# View database in browser
npx prisma studio

# Deploy to production
npx prisma migrate deploy
```

### Database Seed Data

```javascript
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '+1234567890'
    }
  });

  // Create academic year
  const academicYear = await prisma.academicYear.create({
    data: {
      year: '2024-2025',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-30'),
      isCurrent: true
    }
  });

  // Create a sample class
  const class10A = await prisma.class.create({
    data: {
      name: 'Grade 10-A',
      grade: 10,
      section: 'A',
      capacity: 40,
      academicYearId: academicYear.id
    }
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## API Documentation

### Base Configuration

**Base URL:** `https://api.school.com/api/v1`
**Authentication:** Bearer Token (JWT)
**Content-Type:** `application/json`

### Common Response Formats

**Success Response:**

```json
{
  "success": true,
  "data": { },
  "message": "Optional success message"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Authentication Endpoints

#### 1. Register User

```http
POST /auth/register

Request:
{
  "email": "teacher@school.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "TEACHER",
  "phone": "+1234567890"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "teacher@school.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "TEACHER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login

```http
POST /auth/login

Request:
{
  "email": "teacher@school.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "teacher@school.com",
      "role": "TEACHER"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Teacher Endpoints

#### Mark Teacher Attendance

```http
POST /attendance/teacher/checkin
Authorization: Bearer {token}

Request:
{
  "teacherId": "teacher_uuid",
  "biometricDeviceId": "device_001",
  "timestamp": "2024-01-26T08:05:00Z"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "attendance_uuid",
    "status": "ON_TIME",
    "checkInTime": "2024-01-26T08:05:00Z",
    "lateByMinutes": 0
  }
}
```

#### Get Teacher Punctuality

```http
GET /teachers/:teacherId/punctuality?month=2024-01
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "teacherId": "uuid",
    "month": "2024-01",
    "totalWorkingDays": 22,
    "daysPresent": 20,
    "daysLate": 3,
    "punctualityScore": 85.5,
    "attendancePercentage": 90.9
  }
}
```

### Complete API Reference

For the complete API documentation with all endpoints, request/response examples, and error codes, see the main project documentation or access the Swagger UI at:

`https://api.school.com/api-docs`

---

## WebSocket Events

### Connection Setup

```javascript
import io from 'socket.io-client';

const socket = io('https://api.school.com', {
  auth: {
    token: 'jwt_access_token'
  }
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});
```

### Event Types

**Student Attendance:**

- `attendance:student:checkin`
- `attendance:student:checkout`
- `attendance:student:absent`

**Teacher Attendance:**

- `attendance:teacher:checkin`
- `attendance:teacher:late`
- `attendance:teacher:absent`

**Grades:**

- `grade:posted`
- `result:published`

**General:**

- `notification:new`
- `announcement:broadcast`

---

**Next Document:** [03 - Security Implementation](03-security-implementation.md)
