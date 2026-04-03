# 🚀 Finance Backend System (RBAC + Analytics Dashboard)

## 📌 Overview
This project is a backend system for managing financial records with **role-based access control (RBAC)** and **analytics-focused APIs**.

It demonstrates:
- Secure role-based permissions  
- Financial data management  
- Advanced filtering  
- Aggregated dashboard insights  

The goal is to showcase backend design, logical thinking, and real-world API behavior beyond basic CRUD operations.

---

## ⚙️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Postman Docs/Swagger (API Documentation)  
- Postman (Testing)  

---

## 🧠 Core Features

### 🔐 Role-Based Access Control (RBAC)

| Role    | Permissions                          |
|---------|--------------------------------------|
| Admin   | Full access (CRUD + user management) |
| Analyst | Read records + dashboard             |
| Viewer  | Dashboard only                       |

Implemented using middleware-based authorization.

---

### 👤 User Management
- Create users  
- Assign roles (admin / analyst / viewer)  
- Update role and status (active/inactive)  

---

### 💰 Financial Records

Each record includes:
- Amount  
- Type (income / expense)  
- Category  
- Date  
- Notes  

---

### 🔄 CRUD Operations
- Create records  
- Retrieve records  
- Update records  
- Delete records  

---

### 🔍 Advanced Filtering real-world API behavior beyond basic CRUD operations.

---

## ⚙️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose) 
- Postman (Testing)  

---

## 🧠 Core Features

### 🔐 Role-Based Access Control (RBAC)

| Role    | Permissions                          |
|---------|--------------------------------------|
| Admin   | Full access (CRUD + user management) |
| Analyst | Read records + dashboard             |
| Viewer  | Dashboard only                       |

Implemented using middleware-based authorization.

---

### 👤 User Management
- Create users  
- Assign roles (admin / analyst / viewer)  
- Update role and status (active/inactive)  

---

### 💰 Financial Records

Each record includes:
- Amount  
- Type (income / expense)  
- Category  
- Date  
- Notes  

---

### 🔄 CRUD Operations
- Create records  
- Retrieve records  
- Update records  
- Delete records  

---

### 🔍 Advanced Filtering

Supports filtering using query parameters:
GET /records?type=income
GET /records?category=salary
GET /records?startDate=2026-04-01&endDate=2026-04-05

Features:
- Case-insensitive filtering  
- Date range filtering  
- User-specific data filtering  

---

### 📊 Dashboard Analytics

Provides aggregated insights:

- Total income  
- Total expenses  
- Net balance  
- Category-wise totals  
- Recent transactions  
- Monthly trends  

Demonstrates backend aggregation logic beyond CRUD operations.

---

## 🔐 Authentication Design

Authentication is **simulated via middleware**:

- A fixed user ID represents a logged-in user  
- Role is passed via request headers  

Example:
role: admin

This simplifies testing while still enforcing RBAC.

---

## 📄 API Documentation

API documentation is available via Postman:

[https://documenter.getpostman.com/view/your-link](https://documenter.getpostman.com/view/53721777/2sBXionVdK)

This includes:
- All endpoints  
- Example requests  
- Sample responses  
- Header requirements (role-based access)  

### Users
- `POST /users` → Create user  
- `GET /users` → Get all users  
- `PATCH /users/:id` → Update role/status  

---

Authentication is simulated via middleware.

All API requests require a role header:

role: admin

This is also documented in the Postman API documentation.

## 🧪 Example API Calls

### Get Records with Filtering

GET /records?type=income

### Create Record

POST /records

{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-03"
}

### Records
- `POST /records` → Create record  
- `GET /records` → Get records (with filtering)  
- `PATCH /records/:id` → Update record  
- `DELETE /records/:id` → Delete record  

---

### Dashboard
- `GET /dashboard` → Get aggregated data  

---

## 🧪 Example Request

### Create Record

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-03"
}
```

🔧 Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/finance-backend.git
cd finance-backend

2. Install Dependencies
npm install

3. Configure Environment

Create .env file:

MONGODB_URI=mongodb://127.0.0.1:27017/finance-db
PORT=3000

3. Configure Environment

Create .env file:

MONGODB_URI=mongodb://127.0.0.1:27017/finance-db
PORT=3000

🧠 Design Decisions
Middleware-based RBAC for clean and reusable access control
MongoDB chosen for flexible schema design
User-based data isolation using createdBy
Input normalization (lowercase type/category) for reliable filtering
Backend aggregation logic for dashboard insights
🧪 Validation & Error Handling
Required field validation
Type validation (income | expense)
Numeric validation for amount
Proper HTTP status codes
Ownership checks for secure updates/deletes
🧠 Assumptions
Authentication simplified for demonstration
Single-user simulation using fixed ObjectId
Focus on backend logic over authentication complexity
📊 What This Project Demonstrates
Backend architecture
Role-based access control
API design & REST principles
Data modeling with MongoDB
Filtering & querying
Aggregation for analytics
Validation and error handling
🚀 Future Improvements
JWT-based authentication
Pagination for records
Real multi-user support
Advanced analytics (weekly trends, charts)
🏁 Conclusion

This project demonstrates a production-oriented backend system with a focus on:

Clean structure
Logical design
Real-world backend features

It goes beyond CRUD by implementing RBAC, filtering, and analytics APIs, making it suitable for backend-focused roles.


---

# ✅ Now Do This

1. Open your project  
2. Replace content in `README.md`  
3. Save  
4. Push:

```bash
git add README.md
git commit -m "updated README"
git push
```
BY - KARAN VERMA
