# 📌 Placement & Internship Portal

A full-stack **MERN-based Placement & Internship Management System** designed for students, companies, and admins to manage job postings, applications, and recruitment activities efficiently.

---

## 🚀 Features

### 👨‍🎓 Student Module
- Student registration & login (JWT authentication)
- View available job/internship listings
- Search jobs by title, company, or skills
- Apply for jobs
- Track application status

### 🏢 Company Module
- Company registration & login
- Post new job openings
- View applicants for posted jobs
- Manage job listings

### 🛠 Admin Module
- Admin dashboard
- View all users (students & companies)
- Monitor job postings
- System statistics (users, jobs, applications)

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)
- Fetch API

---

## 📁 Project Structure
placement-portal/
│
├── backend/
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ ├── config/
│ └── .env
│
├── frontend/
│ ├── login.html
│ ├── student-login.html
│ ├── company-login.html
│ ├── dashboard-student.html
│ ├── dashboard-company.html
│ ├── dashboard-admin.html
│ └── seedJobs.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/placement-portal.git
cd placement-portal/backend
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
4️⃣ Seed Database (Optional)
node frontend/seedJobs.js
5️⃣ Start Backend Server
npm run dev

Server will run at:

http://localhost:5001
🔐 Authentication Flow
JWT-based authentication
Passwords encrypted using bcrypt
Role-based access:
student
company
admin
📡 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
Student Routes
GET /api/student/jobs
POST /api/student/apply
Company Routes
POST /api/company/post-job
GET /api/company/jobs
Admin Routes
GET /api/admin/stats
GET /api/admin/users
📊 Sample Data

Preloaded companies:

Google
Microsoft
Amazon
Infosys
TCS
Wipro
Meta
Apple
🧠 Future Improvements
React frontend upgrade
Resume upload system
Email notifications
Real-time application tracking
AI-based job recommendations
👨‍💻 Author

Nikita Adhikari
B.Tech CSE Student
Project: Placement & Internship Portal

📜 License

This project is open-source and available for academic use.

⭐ Support

If you like this project, give it a ⭐ on GitHub!


