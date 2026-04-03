🚀 Finance Backend System (RBAC + Dashboard APIs)
📌 Overview

A backend system for managing financial records with role-based access control, built using Node.js, Express, and MongoDB.

This project demonstrates clean backend architecture, API design, validation, and business logic for a finance dashboard.

⚙️ Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
Swagger (API Docs)
🧠 Core Features
🔐 Role-Based Access Control
Admin → full access
Analyst → read + dashboard
Viewer → dashboard only
💰 Financial Records
Create, update, delete records
Filter records
Linked to user (createdBy)
📊 Dashboard APIs
Total income
Total expense
Net balance
Record count
✅ Validation & Error Handling
Required field validation
Proper HTTP status codes
Clean error responses
🔐 Authentication Design

Authentication is simulated via middleware:

Fixed user ID used
Role passed via headers

Example:

role: admin

This keeps focus on backend logic while still enforcing RBAC.

📡 API Endpoints
Users
POST /users
GET /users
PATCH /users/:id
Records
POST /records
GET /records
PATCH /records/:id
DELETE /records/:id
Dashboard
GET /dashboard
🧪 Run Locally
npm install
npm run dev
🔧 Environment Variables
MONGODB_URI=mongodb://127.0.0.1:27017/finance-db
PORT=3000
🧠 Assumptions
Authentication simplified
Single-user simulation
Focus on backend design over auth complexity
📊 What This Project Demonstrates
Backend architecture
Role-based access control
Data modeling
API design
Validation & error handling
