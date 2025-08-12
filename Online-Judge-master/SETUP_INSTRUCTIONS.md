# Online Judge Setup Instructions (Firebase-Free Version)

## Overview
This application has been converted from Firebase to MongoDB Atlas for storing problems and solutions. All test cases and expected outputs are now stored directly in MongoDB.

## Environment Setup

### Backend (.env file in backend directory)
```env
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/onlinejudge
SECRET_KEY=your_jwt_secret_key_here
```

### Frontend (.env file in frontend directory)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Installation Steps

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update the MONGODB_URL in backend/.env

4. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Key Changes Made

### Backend Changes
- Removed Firebase Admin SDK dependencies
- Updated Problems model to store testCases and expectedOutput directly
- Modified submit endpoint to read from MongoDB instead of Firebase
- Updated problem creation to store file contents in MongoDB

### Frontend Changes
- Removed Firebase SDK dependencies
- Updated Upload component to read file contents instead of uploading to Firebase
- Modified Contribute component to send file contents to backend
- Updated ProblemDetails to work without Firebase links

## Database Schema

### Problems Collection
```javascript
{
  name: String,
  tags: String,
  description: String,
  difficulty: String,
  hints: String,
  constraints: String,
  showtc: String,
  showoutput: String,
  testCases: String,        // File content stored as string
  expectedOutput: String,   // File content stored as string
  createdAt: Date,
  updatedAt: Date
}
```

## File Upload Process
1. User selects test case and output files
2. Files are read using FileReader API
3. Content is sent to backend as strings
4. Backend stores content directly in MongoDB
5. When submitting solutions, backend reads test cases from MongoDB

## Benefits of This Approach
- No external file storage dependencies
- Faster access to test cases (no network calls)
- Simpler deployment (no Firebase setup required)
- All data in one place (MongoDB)
- Easier backup and migration
