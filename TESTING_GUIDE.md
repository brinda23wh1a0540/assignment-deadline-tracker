# 🧪 Testing Guide - Assignment Deadline Tracker

## Pre-Testing Setup

1. Ensure MongoDB is running
2. Backend running on port 5000
3. Frontend running on port 3000

---

## 📝 Manual Testing Scenarios

### 1. User Registration

**Test Case 1.1: Valid Registration**
- Navigate to `/register`
- Fill in:
  - Name: "John Doe"
  - Email: "john@example.com"
  - Password: "password123"
  - Confirm Password: "password123"
  - Role: "Student"
- Click "Register"
- ✅ Expected: Redirected to Dashboard

**Test Case 1.2: Password Mismatch**
- Fill registration form with mismatched passwords
- ✅ Expected: Error message "Passwords do not match"

**Test Case 1.3: Duplicate Email**
- Register with email: "john@example.com"
- ✅ Expected: Error message "User already exists"

---

### 2. User Login

**Test Case 2.1: Valid Login**
- Navigate to `/login`
- Email: "john@example.com"
- Password: "password123"
- Click "Login"
- ✅ Expected: Redirected to Dashboard

**Test Case 2.2: Invalid Password**
- Email: "john@example.com"
- Password: "wrongpassword"
- ✅ Expected: Error message "Invalid email or password"

**Test Case 2.3: Non-existent Email**
- Email: "nonexistent@example.com"
- Password: "any"
- ✅ Expected: Error message "Invalid email or password"

---

### 3. Dashboard

**Test Case 3.1: Dashboard Stats**
- Login successfully
- ✅ Expected Features:
  - Welcome message with user name
  - Stats cards showing: Total, Pending, Submitted, Late counts
  - Quick action buttons

**Test Case 3.2: Create Assignment Button**
- Click "Create New Assignment"
- ✅ Expected: Navigate to create assignment page

**Test Case 3.3: View Assignments Button**
- Click "View All Assignments"
- ✅ Expected: Navigate to assignments list

---

### 4. Create Assignment

**Test Case 4.1: Valid Assignment Creation**
- Click "New Assignment"
- Fill in:
  - Title: "Math Homework Chapter 5"
  - Description: "Solve problems 1-20"
  - Subject: "Mathematics"
  - Due Date: Pick a date 1 week from now
  - Priority: "High"
- Click "Create Assignment"
- ✅ Expected: Redirect to assignments list, new assignment visible

**Test Case 4.2: Missing Required Field**
- Try to submit without Title
- ✅ Expected: Error message or validation error

**Test Case 4.3: Past Due Date**
- Try to create assignment with past date
- ✅ Expected: Should allow (for overdue assignments)

---

### 5. Assignment List

**Test Case 5.1: View All Assignments**
- Navigate to Assignments
- ✅ Expected: Table showing all assignments with:
  - Title
  - Subject
  - Due Date
  - Priority
  - Status
  - Action buttons

**Test Case 5.2: Filter by Status**
- Select "Pending" from filter dropdown
- ✅ Expected: Show only pending assignments

**Test Case 5.3: Filter Changes**
- Switch between All, Pending, Submitted, Late
- ✅ Expected: Table updates correctly for each filter

---

### 6. Assignment Actions

**Test Case 6.1: Edit Assignment**
- Click "Edit" button on any assignment
- Change Title: "Updated Title"
- Change Priority: "Low"
- Click "Update Assignment"
- ✅ Expected: Return to list, changes saved

**Test Case 6.2: Mark as Done**
- Click "Mark Done" button
- ✅ Expected: Status changes to "Submitted"

**Test Case 6.3: Delete Assignment**
- Click "Delete" button
- Confirm deletion
- ✅ Expected: Assignment removed from list

**Test Case 6.4: View Assignment Details**
- Click on any assignment title
- ✅ Expected: Navigate to edit page with all details pre-filled

---

### 7. Multiple Assignments

**Test Case 7.1: Create Multiple Assignments**
- Create 5 different assignments with:
  - Different priorities (Low, Medium, High)
  - Different statuses (Pending, Submitted, Late)
  - Different subjects
- ✅ Expected: All visible in assignment list

**Test Case 7.2: Dashboard Stats Update**
- Create/modify assignments
- Navigate back to dashboard
- ✅ Expected: Stats update correctly

---

### 8. Navigation

**Test Case 8.1: Navigation Menu**
- ✅ Expected visible links:
  - Dashboard
  - Assignments
  - New Assignment
  - User name display
  - Logout button

**Test Case 8.2: Logout**
- Click "Logout"
- ✅ Expected: Redirect to login page

**Test Case 8.3: Logout Clears Data**
- After logout, try to access `/dashboard`
- ✅ Expected: Redirect to login page

---

### 9. Authentication Protection

**Test Case 9.1: Protected Routes**
- Logout
- Try to access `/dashboard` directly
- ✅ Expected: Redirect to `/login`

**Test Case 9.2: Token Persistence**
- Login
- Refresh page (F5)
- ✅ Expected: Still logged in (token from localStorage)

**Test Case 9.3: Token in API Calls**
- Login and open DevTools (F12)
- Go to Network tab
- Create/update an assignment
- ✅ Expected: Authorization header shown with "Bearer <token>"

---

### 10. Form Validation

**Test Case 10.1: Email Validation**
- Try to register with invalid email
- ✅ Expected: HTML5 validation error

**Test Case 10.2: Password Length**
- Try to login with extremely short password
- ✅ Expected: Either validation error or invalid credentials message

**Test Case 10.3: Empty Fields**
- Submit forms with empty required fields
- ✅ Expected: Required field validation

---

## 🔍 API Testing (Using Postman or cURL)

### Test Bearer Token Authentication
```bash
# 1. Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'

# 2. Login (get token)
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 3. Create Assignment (with token)
curl -X POST http://localhost:5000/api/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>" \
  -d '{
    "title": "Test Assignment",
    "subject": "Testing",
    "dueDate": "2024-12-15T10:00:00",
    "priority": "High"
  }'

# 4. Get Assignments (with token)
curl -X GET http://localhost:5000/api/assignments \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"

# 5. Get Dashboard Stats
curl -X GET http://localhost:5000/api/assignments/stats/dashboard \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

---

## 🐛 Bug Checking Checklist

- [ ] Can register new users
- [ ] Password is hashed (not stored as plain text)
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] JWT token is stored in localStorage
- [ ] Protected routes redirect unauthenticated users
- [ ] Can create assignments
- [ ] Can edit own assignments
- [ ] Can delete own assignments
- [ ] Can update assignment status
- [ ] Dashboard shows correct statistics
- [ ] Filter works on assignment list
- [ ] CORS allows frontend-backend communication
- [ ] Logout clears token and user data
- [ ] Page refresh maintains login state
- [ ] Responsive design on mobile
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] Loading states show during API calls
- [ ] Empty states handled (no assignments message)

---

## 📊 Performance Testing

### Test Case: Load 100 Assignments
- Create many assignments via API
- Load assignment list
- ✅ Expected: Page loads within reasonable time

### Test Case: Filter Performance
- With 100+ assignments, use filters
- ✅ Expected: Filters respond quickly

---

## 🔐 Security Testing

**Test Case: XSS Prevention**
- Create assignment with script tags: `<script>alert('xss')</script>`
- ✅ Expected: Script is not executed, displayed as text

**Test Case: SQL Injection**
- Try to inject SQL in email field: `admin@test.com'; DROP TABLE users;--`
- ✅ Expected: Treated as regular string (MongoDB uses different syntax anyway)

**Test Case: Token Tampering**
- Modify token in localStorage
- ✅ Expected: API calls fail with 401 Unauthorized

---

## 📋 Test Report Template

After testing, document:
- ✅ Passed Cases: Count
- ❌ Failed Cases: Count
- ⚠️ Issues Found:
  - Issue 1
  - Issue 2
- 🎯 Performance Notes:
  - Load time
  - Memory usage
- 📝 Recommendations:
  - Improvement 1
  - Improvement 2

---

**Testing Complete! Report any issues found. 🎉**
