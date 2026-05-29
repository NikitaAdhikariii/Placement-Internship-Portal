# 🎓 Placement & Internship Portal

A full-stack web application that connects **students**, **companies**, and **admins** for seamless placement and internship management — powered by an AI-based job recommendation engine.

---

## 🚀 Features

### 👩‍🎓 Students
- Register, log in, and manage profile
- Browse and apply for jobs & internships
- Get **AI-powered job recommendations** tailored to their profile
- Receive real-time **notifications** on application updates

### 🏢 Companies
- Register and manage company profiles
- Post job and internship listings
- View and manage student applications

### 🛠️ Admin
- Manage all users (students & companies)
- Oversee job postings and applications
- Monitor platform activity via admin dashboard

### 🤖 AI Recommender
- Uses **BERT-based semantic similarity** via `sentence-transformers` (`all-MiniLM-L6-v2` model)
- Converts student skills and job descriptions into vector embeddings
- Ranks jobs using **cosine similarity** scoring — returns top 5 best matches
- Runs via `aiRunner.py`, communicates with Node.js via `routes/aiRoutes.js`

### 🔔 Notifications
- Automated notifications on application status changes
- Managed via `routes/notificationRoutes.js` and `models/Notification.js`

### 📧 Email & Utilities
- Email notifications via `utils/mailer.js`
- Trie-based search utility via `utils/trie.js`

---

## 🧰 Tech Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Frontend   | HTML, CSS, JavaScript                  |
| Backend    | Node.js, Express.js                    |
| Database   | MongoDB (Mongoose)                     |
| AI Engine  | Python 3, sentence-transformers (BERT) |
| Auth       | JWT + bcrypt                           |
| Middleware | Role-based access control              |

---

## 📁 Project Structure
placement-portal/
├── backend/
│   ├── ai/
│   │   ├── recommender.py          # AI job recommendation logic
│   │   └── jobs.json               # Job data for AI engine
│   ├── config/
│   │   └── db.js                   # MongoDB connection config
│   ├── controllers/
│   │   └── authController.js       # Auth logic (login/register)
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── roleMiddleware.js        # Role-based access (student/company/admin)
│   ├── models/
│   │   ├── User.js                  # Base user model
│   │   ├── Student.js               # Student-specific model
│   │   ├── Job.js                   # Job listing model
│   │   ├── Application.js           # Job application model
│   │   └── Notification.js          # Notification model
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth
│   │   ├── studentRoutes.js         # /api/student
│   │   ├── companyRoutes.js         # /api/company
│   │   ├── jobRoutes.js             # /api/jobs
│   │   ├── adminRoutes.js           # /api/admin
│   │   ├── notificationRoutes.js    # /api/notifications
│   │   ├── aiRoutes.js              # /api/ai
│   │   └── studyRoutes.js           # /api/study
│   ├── uploads/                     # Uploaded resumes/files
│   ├── utils/
│   │   ├── mailer.js                # Email notification utility
│   │   └── trie.js                  # Trie-based search utility
│   ├── aiRunner.py                  # Python–Node.js AI bridge
│   ├── seed.js                      # Database seeder
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   ├── .env                         # Environment variables (not committed)
│   └── .gitignore
│
└── frontend/
├── images/                      # Static image assets
├── index.html                   # Landing page
├── login.html                   # General login
├── student-login.html           # Student login
├── company-login.html           # Company login
├── admin-login.html             # Admin login
├── dashboard-student.html       # Student dashboard
├── dashboard-company.html       # Company dashboard
└── dashboard-admin.html         # Admin dashboard
---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Python 3.x

### 1. Clone the repository
```bash
git clone https://github.com/NikitaAdhikariii/Placement-Internship-Portal.git
cd Placement-Internship-Portal
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Configure environment variables
Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

### 4. Install Python dependency
```bash
pip install sentence-transformers
```

### 5. Seed the database (optional)
```bash
node seed.js
```

### 6. Start the backend server
```bash
node server.js
```
Server runs at → `http://localhost:5001`

### 7. Open the frontend
Open any file from `frontend/` in your browser.

---

## 🔗 API Endpoints

| Route | Description |
|-------|-------------|
| `POST /api/auth/register` | Register a new user |
| `POST /api/auth/login` | Login and get JWT token |
| `GET  /api/student/...` | Student profile & applications |
| `GET  /api/company/...` | Company profile & job postings |
| `GET  /api/admin/...` | Admin controls |
| `GET  /api/notifications` | Fetch notifications |
| `GET  /api/ai/recommend` | Get AI job recommendations |
| `GET  /api/study` | Study resources |

---

## 🤖 AI Recommendation Engine

Uses **BERT-based semantic embeddings** to match students with the most relevant jobs.

### How it works
Student skills → text embedding (BERT)
Job titles + skills → text embeddings (BERT)
↓
Cosine Similarity
↓
Top 5 ranked jobs returned
### Model
`all-MiniLM-L6-v2` from sentence-transformers — lightweight BERT optimised for semantic similarity.

### Run it
```bash
cd backend
python aiRunner.py
```

---

## 🔒 Security Notes

- Passwords hashed with **bcrypt**
- Routes protected with **JWT middleware**
- Role-based access via **roleMiddleware.js**
- Never commit `.env`

---

## 🧹 Recommended .gitignore
node_modules/
.env
.DS_Store
backend/ai/pycache/
*.pyc
uploads/
*.code-workspace
---

## 👩‍💻 Author

**Nikita Adhikari**
[GitHub → NikitaAdhikariii](https://github.com/NikitaAdhikariii)
