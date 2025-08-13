# Online Judge Setup Instructions


## Environment Setup

### Backend (.env file in backend directory)
```env
MONGODB_URI= your MONGODB URL
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
- All data in one place (MongoDB)
- Easier backup and migration
