## Medium Clone Project
A full-stack blogging platform built with modern web technologies.

## Tech Stack
# Frontend
React 18 with TypeScript
Vite for build tooling
TailwindCSS for styling
React Router v7
Axios for API calls
React Hot Toast notifications
Backend
Cloudflare Workers
Hono framework
Prisma with PostgreSQL
JWT authentication
Bcrypt for password hashing
CORS enabled
Common Package
Shared TypeScript types
Zod for validation
Published as @shamsii/medium-project-common

# Features
User authentication (signup/signin)
Blog post creation and management
JWT-based authorization
Real-time form validation
Responsive design
Loading states
Error handling
Protected routes
Getting Started
Prerequisites
Node.js
npm/yarn
PostgreSQL database

# Installation
Clone and install dependencies:
git clone [repository-url]
cd medium-project

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install common package dependencies
cd ../common
npm install
Environment Setup
Backend .env:

DATABASE_URL="your-postgres-url"
JWTSECRET="your-secret"
SALT=10
Frontend .env:

VITE_BACKEND_URL="http://localhost:8787"
Run Development Servers:
# Start frontend
cd frontend
npm run dev

# Start backend
cd backend
npm run dev

# API Endpoints
User Routes
POST /api/v1/user/signup - Create account
POST /api/v1/user/signin - User login
Blog Routes
GET /api/v1/blog - Get specific blog
GET /api/v1/blog/bulk - Get all blogs
GET /api/v1/blog/:id - Get user's blogs
POST /api/v1/blog - Create blog
PUT /api/v1/blog - Update blog


# Project Structure
├── frontend/          # React frontend
├── backend/           # Cloudflare Workers backend
└── common/           # Shared types package

# License
ISC

# Author
Shams Zaman

