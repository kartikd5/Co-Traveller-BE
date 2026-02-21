# Co-Traveller Finder Platform API

This is a production-ready NestJS REST API for a Co-Traveller platform matching the business requirements.

## 🚀 Technical Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Authentication**: JWT Strategy via `@nestjs/passport` (Access + Refresh tokens)
- **Security**: `helmet`, `bcrypt`, Rate Limiting (`@nestjs/throttler`)
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: Swagger (`@nestjs/swagger`)

## 🛠️ Setup & Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

   _Update `MONGODB_URI` and JWT secrets with your secure credentials._

3. **Run the Application**

   ```bash
   # Development
   npm run start:dev

   # Production Build
   npm run build
   npm run start:prod
   ```

## 📖 Swagger Documentation

Once the server is running, visit the auto-generated Swagger UI specifically at:
**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

There you'll find:

- Clear parameter representations for OTP generation.
- The `/search` query API with pagination, filters, and global index.
- JWT secured endpoints (use `Authorize` button after `verify-otp`).

## ⚙️ Core Architectures & Constraints Implemented

- **One-Way Trips Only:** The `CreateTravelPostDto` rigorously validates fields preventing return journeys.
- **Auto-Deletion:** Implemented MongoDB TTL indexes on `TravelPost` schemas that auto-delete matching documents directly at the DB level via Mongoose Schema Hooks.
- **Global Responses:** A globally bound `ResponseInterceptor` handles consistent response structures.
- **Global Error Handling:** Implemented `AllExceptionsFilter` conforming to the exact error signature specified.
- **Secure Signup:** Stateless OTP-based entry logic configured securely.

## 📦 Production Deployment Guide

1. Ensure `NODE_ENV=production` is populated.
2. Ensure you have properly secured your MongoDB connection string (Atlas).
3. The server uses `winston` for robust logging which captures all unhandled instances, make sure you configure remote transports in `logger.config.ts`.
4. We advise using `pm2` or `Docker` natively for graceful shutdown integrations.
