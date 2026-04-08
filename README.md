# Assignment Deadline Tracker - MERN Stack

A full-stack web application built with MERN (MongoDB, Express, React, Node.js) that helps students track assignments, monitor deadlines, and manage submissions efficiently.

## 🎯 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **User Roles**: Student, Faculty, and Admin
- **Assignment Management**: Create, read, update, and delete assignments
- **Status Tracking**: Track assignment status (Pending, Submitted, Late)
- **Priority Levels**: Set priority levels (Low, Medium, High)
- **Dashboard**: View statistics and quick overview of assignments
- **Responsive UI**: Mobile-friendly React interface
- **Deadline Reminders**: Track deadlines with due date management

## 📋 Project Structure

```
assignment-deadline-tracker/
├── backend/                 # Node.js + Express backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Route controllers
│   │   ├── assignmentController.js
│   │   └── usercontroller.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Mongoose schemas
│   │   ├── Assignment.js
│   │   ├── User.js
│   │   └── Submission.js
│   ├── routes/            # API routes
│   │   ├── assignmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env               # Environment variables
│   ├── package.json       # Node dependencies
│   └── server.js          # Express server setup
│
└── frontend/              # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Navigation.js
    │   │   └── ProtectedRoute.js
    │   ├── context/       # React context
    │   │   └── AuthContext.js
    │   ├── pages/         # Page components
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── AssignmentList.js
    │   │   ├── CreateAssignment.js
    │   │   └── EditAssignment.js
    │   ├── api.js         # API utility
    │   ├── styles.css     # Global styles
    │   ├── App.js         # Main app component
    │   └── index.js       # React entry point
    ├── .env               # Frontend environment variables
    └── package.json       # React dependencies
```

## 🛠 Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token for authentication
- **bcryptjs**: Password hashing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **date-fns**: Date manipulation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and configure:
```
MONGO_URI=mongodb://127.0.0.1:27017/assignmentTracker
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### User Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users` - Get all users (admin only)

### Assignment Endpoints
- `GET /api/assignments` - Get all assignments (protected)
- `GET /api/assignments/:id` - Get single assignment (protected)
- `POST /api/assignments` - Create assignment (protected)
- `PUT /api/assignments/:id` - Update assignment (protected)
- `DELETE /api/assignments/:id` - Delete assignment (protected)
- `GET /api/assignments/stats/dashboard` - Get dashboard statistics (protected)

## 👥 User Roles & Permissions

### Student
- Create and manage own assignments
- Track own assignment status
- View own dashboard statistics

### Faculty
- View all student assignments
- Monitor student progress
- Manage assignments

### Admin
- Full system access
- User management
- System configuration

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation
- Role-based authorization
- Protected routes
- Secure token storage in localStorage

## 🚀 Deployment

### Backend (Heroku/Docker)
```bash
npm run build
npm start
```

### Frontend (Vercel/Netlify)
```bash
npm run build
```

## 📝 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String (student|faculty|admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Assignments Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  dueDate: Date,
  priority: String (Low|Medium|High),
  status: String (Pending|Submitted|Late),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Submissions Collection
```javascript
{
  _id: ObjectId,
  assignmentId: ObjectId (ref: Assignment),
  userId: ObjectId (ref: User),
  fileUrl: String,
  submittedAt: Date,
  remarks: String,
  createdAt: Date
}
```

## 🔄 Workflow

1. **Registration**: User registers as Student/Faculty/Admin
2. **Authentication**: User logs in with email and password
3. **Dashboard**: User views personalized dashboard with statistics
4. **Create Assignment**: Students create new assignments with details
5. **Track Assignment**: Monitor assignment status and deadlines
6. **Update Status**: Mark assignments as Submitted or Late
7. **Delete Assignment**: Remove completed or unwanted assignments

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### CORS Error
- Verify CORS is enabled in Express
- Check frontend API URL in `.env`

### Authentication Failed
- Ensure JWT_SECRET is set in backend `.env`
- Check token is being sent correctly
- Verify `Bearer` prefix in Authorization header

## 📚 Future Enhancements

- Email notifications for deadlines
- Calendar integration
- File upload for submissions
- Real-time notifications with WebSockets
- Mobile app (React Native)
- AI-based deadline prediction
- Analytics and reporting dashboard

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Brinda Madhavi Penupothula** (Roll No: 23WH1A0540)

## 🙏 Acknowledgments

This project is created as a Full-Stack Learning Project to demonstrate MERN stack development skills.

---

**Happy Coding! 🚀**
