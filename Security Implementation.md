---
noteId: "8e6a1cb00b6411f1940c7b1c911d6a2f"
tags: []
---

# School Administration System

## Part 3: Security Implementation

**Version:** 1.0.0
**Last Updated:** January 26, 2025
**Document:** 3 of 6

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [Environment Variables](#environment-variables)
3. [Authentication &amp; Authorization](#authentication-and-authorization)
4. [Input Validation](#input-validation)
5. [Rate Limiting](#rate-limiting)
6. [Security Headers](#security-headers)
7. [Data Encryption](#data-encryption)
8. [Audit Logging](#audit-logging)

---

## Security Overview

### Multi-Layer Security Architecture

```
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
```

### Security Principles

1. **Defense in Depth** - Multiple security layers
2. **Least Privilege** - Minimum required access
3. **Fail Secure** - Default to deny on errors
4. **Zero Trust** - Verify everything
5. **Encryption Everywhere** - Data at rest and in transit

---

## Environment Variables

### Complete .env Configuration

```bash
# ============================================
# APPLICATION CONFIGURATION
# ============================================
NODE_ENV=production
PORT=3000
API_URL=https://api.school.com
FRONTEND_URL=https://school.com
ADMIN_URL=https://admin.school.com

# ============================================
# DATABASE (Supabase PostgreSQL)
# ============================================
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres

# ============================================
# REDIS CACHE (Upstash)
# ============================================
REDIS_URL=rediss://default:YOUR_PASSWORD@region.upstash.io:6379

# ============================================
# JWT CONFIGURATION
# Generate secrets: openssl rand -base64 32
# ============================================
JWT_SECRET=your_ultra_secure_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ============================================
# ENCRYPTION
# ============================================
ENCRYPTION_KEY=your_32_character_encryption_key_here
BCRYPT_ROUNDS=12

# ============================================
# FIREBASE (Cloud Messaging)
# ============================================
FIREBASE_PROJECT_ID=school-admin-project
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@school-admin.iam.gserviceaccount.com

# ============================================
# EMAIL SERVICE (Resend)
# ============================================
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@school.com
FROM_NAME=School Admin System

# ============================================
# SMS SERVICE (Twilio - Optional)
# ============================================
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# ============================================
# FILE STORAGE (Cloudflare R2)
# ============================================
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=school-files
R2_PUBLIC_URL=https://files.school.com

# ============================================
# SECURITY
# ============================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your_session_secret_here
CORS_ORIGINS=https://school.com,https://admin.school.com

# ============================================
# MONITORING (Sentry)
# ============================================
SENTRY_DSN=https://xxxxxxxxxxxxx@o12345.ingest.sentry.io/12345

# ============================================
# 2FA CONFIGURATION
# ============================================
TWO_FACTOR_ISSUER=School Admin System
```

### Environment Variable Security

```javascript
// config/environment.js
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'ENCRYPTION_KEY'
];

// Validate required environment variables
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Validate JWT secret length
if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters');
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  // ... other configs
};
```

---

## Authentication and Authorization

### JWT Authentication Implementation

```javascript
// utils/jwt.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const Redis = require('ioredis');

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL);

class JWTService {
  /**
   * Generate access token (15 minutes)
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: 'school-admin-api',
      audience: 'school-admin-client'
    });
  }

  /**
   * Generate refresh token (7 days)
   */
  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      issuer: 'school-admin-api',
      audience: 'school-admin-client'
    });
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: 'school-admin-api',
        audience: 'school-admin-client'
      });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
        issuer: 'school-admin-api',
        audience: 'school-admin-client'
      });
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Rotate refresh token
   */
  async rotateRefreshToken(oldRefreshToken) {
    // Verify old token
    const decoded = this.verifyRefreshToken(oldRefreshToken);

    // Check if token exists in database
    const session = await prisma.session.findUnique({
      where: { refreshToken: oldRefreshToken }
    });

    if (!session) {
      throw new Error('Invalid refresh token');
    }

    // Delete old session
    await prisma.session.delete({
      where: { id: session.id }
    });

    // Generate new tokens
    const accessToken = this.generateAccessToken({
      userId: decoded.userId,
      role: decoded.role
    });

    const refreshToken = this.generateRefreshToken({
      userId: decoded.userId
    });

    // Create new session
    await prisma.session.create({
      data: {
        userId: decoded.userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return { accessToken, refreshToken };
  }

  /**
   * Blacklist token (for logout)
   */
  async blacklistToken(token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
  
    // Store in Redis with TTL
    await redis.setex(`blacklist:${token}`, expiresIn, 'true');
  }

  /**
   * Check if token is blacklisted
   */
  async isTokenBlacklisted(token) {
    const result = await redis.get(`blacklist:${token}`);
    return result === 'true';
  }
}

module.exports = new JWTService();
```

### Authentication Middleware

```javascript
// middleware/auth.js
const jwtService = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Authenticate user with JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Check if token is blacklisted
    const isBlacklisted = await jwtService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked',
        code: 'TOKEN_REVOKED'
      });
    }

    // Verify token
    const decoded = jwtService.verifyAccessToken(token);
  
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        firstName: true,
        lastName: true
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(401).json({
        success: false,
        message: 'Account is not active',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        success: false,
        message: 'Token expired or invalid',
        code: 'TOKEN_EXPIRED'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

/**
 * Authorize based on roles
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        code: 'FORBIDDEN',
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Check resource ownership
 */
const checkOwnership = (resourceType) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user.id;

    try {
      let resource;
    
      switch (resourceType) {
        case 'student':
          resource = await prisma.student.findUnique({
            where: { id: resourceId },
            select: { userId: true }
          });
          break;
        case 'teacher':
          resource = await prisma.teacher.findUnique({
            where: { id: resourceId },
            select: { userId: true }
          });
          break;
        // Add other resource types
      }

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Admins can access everything
      if (req.user.role === 'ADMIN') {
        return next();
      }

      // Check ownership
      if (resource.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authorization failed'
      });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  checkOwnership
};
```

### Two-Factor Authentication (2FA)

```javascript
// services/twoFactorService.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class TwoFactorService {
  /**
   * Generate 2FA secret
   */
  async generateSecret(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    });

    const secret = speakeasy.generateSecret({
      name: `School Admin (${user.email})`,
      issuer: process.env.TWO_FACTOR_ISSUER || 'School Admin System'
    });

    // Save secret to database
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret.base32 }
    });

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);

    return {
      secret: secret.base32,
      qrCode: qrCodeDataUrl,
      manualEntryKey: secret.base32
    };
  }

  /**
   * Verify 2FA token
   */
  async verifyToken(userId, token) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true }
    });

    if (!user.twoFactorSecret) {
      throw new Error('2FA not set up');
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2 // Allow 2 time steps before/after
    });

    return verified;
  }

  /**
   * Enable 2FA
   */
  async enable2FA(userId, token) {
    const verified = await this.verifyToken(userId, token);

    if (!verified) {
      throw new Error('Invalid verification code');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true }
    });

    return true;
  }

  /**
   * Disable 2FA
   */
  async disable2FA(userId, token) {
    const verified = await this.verifyToken(userId, token);

    if (!verified) {
      throw new Error('Invalid verification code');
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null
      }
    });

    return true;
  }

  /**
   * Generate backup codes
   */
  generateBackupCodes() {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );
    }
    return codes;
  }
}

module.exports = new TwoFactorService();
```

---

## Input Validation

### Validation Middleware

```javascript
// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation result handler
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

/**
 * User registration validation
 */
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email address required')
    .custom(async (email) => {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        throw new Error('Email already registered');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be 8-128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('First name must be 2-50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('Last name must be 2-50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('role')
    .isIn(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'])
    .withMessage('Valid role required'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number required'),
  
  validate
];

/**
 * Attendance validation
 */
const validateAttendance = [
  body('studentId')
    .optional()
    .isUUID()
    .withMessage('Valid student ID required'),
  
  body('teacherId')
    .optional()
    .isUUID()
    .withMessage('Valid teacher ID required'),
  
  body('biometricDeviceId')
    .trim()
    .notEmpty()
    .isLength({ max: 50 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Valid biometric device ID required'),
  
  body('timestamp')
    .isISO8601()
    .withMessage('Valid timestamp required (ISO 8601 format)')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      const diff = Math.abs(now - date);
      // Allow timestamps within 1 hour of current time
      if (diff > 3600000) {
        throw new Error('Timestamp must be within 1 hour of current time');
      }
      return true;
    }),
  
  validate
];

/**
 * SQL Injection Prevention
 */
const sanitizeSQLInput = (req, res, next) => {
  const sqlKeywords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE',
    'ALTER', 'EXEC', 'EXECUTE', 'UNION', 'DECLARE', '--', ';'
  ];

  const checkForSQLInjection = (value) => {
    if (typeof value === 'string') {
      const upperValue = value.toUpperCase();
      return sqlKeywords.some(keyword => upperValue.includes(keyword));
    }
    return false;
  };

  // Check all request data
  const checkObject = (obj) => {
    for (const key in obj) {
      if (checkForSQLInjection(obj[key])) {
        return true;
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (checkObject(obj[key])) {
          return true;
        }
      }
    }
    return false;
  };

  if (checkObject(req.body) || checkObject(req.query) || checkObject(req.params)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input detected',
      code: 'INVALID_INPUT'
    });
  }

  next();
};

module.exports = {
  validate,
  validateUserRegistration,
  validateAttendance,
  sanitizeSQLInput
};
```

---

## Rate Limiting

### Rate Limiter Implementation

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

/**
 * General API rate limiter
 */
const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate_limit:api:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

/**
 * Strict rate limiter for authentication
 */
const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate_limit:auth:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many login attempts, account temporarily locked'
  },
  handler: async (req, res) => {
    // Log suspicious activity
    console.warn(`Rate limit exceeded for IP: ${req.ip}, Email: ${req.body.email}`);
  
    res.status(429).json({
      success: false,
      message: 'Too many failed login attempts. Please try again in 15 minutes.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

/**
 * Attendance marking rate limiter
 */
const attendanceLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate_limit:attendance:'
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: 'Too many attendance requests, please slow down'
  }
});

/**
 * File upload rate limiter
 */
const uploadLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate_limit:upload:'
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: {
    success: false,
    message: 'Upload limit exceeded, please try again later'
  }
});

/**
 * Dynamic rate limiter based on user role
 */
const dynamicRateLimiter = (limits) => {
  return async (req, res, next) => {
    const userRole = req.user?.role || 'GUEST';
    const limit = limits[userRole] || limits.default;

    const key = `rate_limit:dynamic:${userRole}:${req.ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, limit.windowSeconds);
    }

    if (current > limit.max) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit exceeded',
        retryAfter: await redis.ttl(key)
      });
    }

    res.setHeader('X-RateLimit-Limit', limit.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit.max - current));

    next();
  };
};

module.exports = {
  apiLimiter,
  authLimiter,
  attendanceLimiter,
  uploadLimiter,
  dynamicRateLimiter
};
```

---

## Security Headers

### Helmet Configuration

```javascript
// middleware/security.js
const helmet = require('helmet');

const securityHeaders = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", 'wss:', 'https:'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      workerSrc: ["'self'", 'blob:'],
      childSrc: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      manifestSrc: ["'self'"]
    }
  },

  // HTTP Strict Transport Security
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },

  // X-Frame-Options
  frameguard: {
    action: 'deny'
  },

  // X-Content-Type-Options
  noSniff: true,

  // X-XSS-Protection
  xssFilter: true,

  // Referrer-Policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },

  // X-Permitted-Cross-Domain-Policies
  permittedCrossDomainPolicies: {
    permittedPolicies: 'none'
  },

  // Hide X-Powered-By
  hidePoweredBy: true,

  // X-DNS-Prefetch-Control
  dnsPrefetchControl: {
    allow: false
  },

  // Expect-CT
  expectCt: {
    maxAge: 86400,
    enforce: true
  }
});

module.exports = securityHeaders;
```

### CORS Configuration

```javascript
// middleware/cors.js
const cors = require('cors');

const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) {
      return callback(null, true);
    }
  
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'X-Total-Count'
  ],
  maxAge: 600, // 10 minutes
  optionsSuccessStatus: 204
};

module.exports = cors(corsOptions);
```

---

## Data Encryption

### Encryption Utilities

```javascript
// utils/encryption.js
const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class Encryption {
  constructor() {
    this.key = process.env.ENCRYPTION_KEY;
    this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  }

  /**
   * Encrypt data using AES-256
   */
  encrypt(data) {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.key
      ).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt AES-256 encrypted data
   */
  decrypt(encryptedData) {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        this.key
      ).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Hash password using bcrypt
   */
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(this.bcryptRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error('Password hashing error:', error);
      throw new Error('Failed to hash password');
    }
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Password comparison error:', error);
      return false;
    }
  }

  /**
   * Generate random token
   */
  generateToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hash data using SHA-256
   */
  hash(data) {
    return crypto
      .createHash('sha256')
      .update(data)
      .digest('hex');
  }

  /**
   * Generate secure random password
   */
  generatePassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    const values = crypto.randomBytes(length);
  
    for (let i = 0; i < length; i++) {
      password += charset[values[i] % charset.length];
    }
  
    return password;
  }

  /**
   * Encrypt file
   */
  encryptFile(buffer) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(this.key),
      iv
    );
  
    const encrypted = Buffer.concat([
      cipher.update(buffer),
      cipher.final()
    ]);
  
    return {
      iv: iv.toString('hex'),
      data: encrypted.toString('hex')
    };
  }

  /**
   * Decrypt file
   */
  decryptFile(encryptedData, ivHex) {
    const algorithm = 'aes-256-cbc';
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedBuffer = Buffer.from(encryptedData, 'hex');
  
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(this.key),
      iv
    );
  
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final()
    ]);
  
    return decrypted;
  }
}

module.exports = new Encryption();
```

---

## Audit Logging

### Audit Log Service

```javascript
// utils/auditLog.js
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');

const prisma = new PrismaClient();

// Winston logger for file logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/audit.log',
      maxsize: 10485760, // 10MB
      maxFiles: 10
    })
  ]
});

class AuditLog {
  /**
   * Log an action to database and file
   */
  async log(data) {
    try {
      // Log to database
      await prisma.auditLog.create({
        data: {
          userId: data.userId || null,
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId || null,
          changes: data.changes || null,
          ipAddress: data.ipAddress || null,
          userAgent: data.userAgent || null
        }
      });

      // Log to file
      logger.info({
        ...data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Audit log error:', error);
      // Don't throw - audit logging shouldn't break the app
    }
  }

  /**
   * Log authentication events
   */
  async logAuth(userId, action, success, req) {
    await this.log({
      userId,
      action: success ? action : 'FAILED_' + action,
      resource: 'auth',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      changes: {
        success,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Log data modifications
   */
  async logDataChange(userId, action, resource, resourceId, before, after, req) {
    await this.log({
      userId,
      action,
      resource,
      resourceId,
      changes: {
        before,
        after,
        modifiedFields: this.getModifiedFields(before, after)
      },
      ipAddress: req?.ip,
      userAgent: req?.headers['user-agent']
    });
  }

  /**
   * Get modified fields between before and after
   */
  getModifiedFields(before, after) {
    const modified = [];
  
    if (!before || !after) return modified;
  
    Object.keys(after).forEach(key => {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        modified.push(key);
      }
    });
  
    return modified;
  }

  /**
   * Get audit logs with filters
   */
  async getLogs(filters = {}, page = 1, limit = 50) {
    const where = {};

    if (filters.userId) where.userId = filters.userId;
    if (filters.action) where.action = filters.action;
    if (filters.resource) where.resource = filters.resource;
  
    if (filters.startDate || filters.endDate) {
      where.timestamp = {};
      if (filters.startDate) {
        where.timestamp.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.timestamp.lte = new Date(filters.endDate);
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.auditLog.count({ where })
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get suspicious activity
   */
  async getSuspiciousActivity(hours = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const suspiciousLogs = await prisma.auditLog.findMany({
      where: {
        timestamp: { gte: since },
        action: {
          in: ['FAILED_LOGIN', 'FAILED_PASSWORD_CHANGE', 'PERMISSION_CHANGE']
        }
      },
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    return suspiciousLogs;
  }
}

module.exports = new AuditLog();
```

---

## Security Best Practices Checklist

### Pre-Deployment Security Audit

- [ ] All environment variables secured
- [ ] JWT secrets are strong (32+ characters)
- [ ] Password hashing uses bcrypt with 12+ rounds
- [ ] HTTPS/TLS enabled on all endpoints
- [ ] CORS configured with whitelist
- [ ] Rate limiting enabled on all endpoints
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention implemented
- [ ] XSS protection enabled
- [ ] CSRF protection on state-changing operations
- [ ] Security headers configured (Helmet)
- [ ] Audit logging enabled
- [ ] Error messages don't leak sensitive info
- [ ] File upload validation and scanning
- [ ] Session management secure
- [ ] 2FA available for admin accounts
- [ ] Regular security dependency updates
- [ ] Penetration testing completed
- [ ] Security incident response plan ready

---

**Next Document:** [04 - Development Phases](04-development-phases.md)
