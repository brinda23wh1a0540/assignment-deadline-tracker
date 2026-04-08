# 🚀 Quick Start Guide - Assignment Deadline Tracker

## Getting Started in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Start MongoDB (if using local)
```bash
mongod
```

### Step 4: Start Backend Server
```bash
cd backend
npm run dev
```
Expected output: `Server running on port 5000`

### Step 5: Start Frontend (in a new terminal)
```bash
cd frontend
npm start
```
Expected output: Browser opens at `http://localhost:3000`

## 📌 Important Notes

### Backend Environment Variables
The backend `.env` file contains:
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `NODE_ENV`: Environment mode

### Frontend Environment Variables
The frontend `.env` file contains:
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

## 🧪 Test the Application

1. **Register a New Account**
   - Go to `http://localhost:3000/register`
   - Fill in Name, Email, Password
   - Select Role (Student/Faculty/Admin)
   - Click Register

2. **Login**
   - Go to `http://localhost:3000/login`
   - Enter your email and password
   - Click Login

3. **Create an Assignment**
   - Click "New Assignment" from dashboard
   - Fill in the form with:
     - Title: "Math Homework"
     - Subject: "Mathematics"
     - Due Date: Pick a future date
     - Priority: High
   - Click "Create Assignment"

4. **Manage Assignments**
   - View all assignments on the Assignments page
   - Edit assignments by clicking "Edit"
   - Mark as done by clicking "Mark Done"
   - Delete by clicking "Delete"

5. **View Dashboard**
   - See statistics showing:
     - Total assignments
     - Pending count
     - Submitted count
     - Late count

## 🔑 Default Test Credentials

You can test with:
- Email: `student@test.com`
- Password: `password123`

(Create your own account in Register page for new credentials)

## 📁 Project Structure

- **backend/**: Node.js + Express server with MongoDB
- **frontend/**: React application with pages and components
- **README.md**: Full project documentation

## 🔧 Available Commands

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm start` - Start development server on port 3000
- `npm build` - Create production build
- `npm test` - Run tests

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: Ensure MongoDB is running. Start it with `mongod`

### Issue: "CORS Error in browser"
**Solution**: Make sure backend is running on port 5000

### Issue: "API calls failing"
**Solution**: Check that `REACT_APP_API_URL` in frontend/.env matches backend URL

### Issue: "Login not working"
**Solution**: Verify JWT_SECRET is set in backend/.env

## 📚 API Base URL
- Development: `http://localhost:5000/api`
- All API routes require authentication token except `/register` and `/login`

## 🔐 Authentication
- Token is automatically stored in localStorage after login
- Token is automatically sent with all API requests
- Token expires in 30 days (configurable in backend)

## 📞 Need Help?

Check the main README.md for:
- Detailed feature list
- API endpoint documentation
- Database schema
- Security features
- Deployment instructions

---

**Happy Tracking! 📋✨**
