# 🚀 Judge My Code - Online Coding Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

DEMO VIDEO LINK - https://www.loom.com/share/1c16c3f042be46d0a8ec603a65664edb?sid=96168d04-ef10-4f2d-bde3-50666e9e5dcb

> A comprehensive online coding platform where developers can practice, solve problems, and get AI-powered code reviews.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 Usage](#-usage)
- [👨‍💼 Admin Features](#-admin-features)
- [🤖 AI Review Feature](#-ai-review-feature)
- [📊 API Documentation](#-api-documentation)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## ✨ Features

### 🎯 Core Features
- **Multi-language Support**: Code execution in C++, Python, and Java
- **Problem Management**: Extensive collection of coding problems with detailed descriptions
- **Test Case Validation**: Hidden test cases with automatic PASSED/FAILED verdicts
- **Difficulty Levels**: Problems categorized by difficulty (Easy, Medium, Hard)
- **Tag-based Filtering**: Filter problems by topics and concepts
- **Progress Tracking**: Visual progress indicators based on solved problems
- **Hints System**: Helpful hints to guide users through problems

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Code Editor**: Monaco Editor integration for enhanced coding experience
- **Real-time Feedback**: Instant code execution and result display
- **Submission History**: Track all your previous submissions
- **User Authentication**: Secure login/signup with JWT tokens

### 🏆 Advanced Features
- **AI Code Review**: AI-powered code analysis and suggestions using Google Gemini
- **Admin Panel**: Complete problem management system for administrators
- **Performance Analytics**: Visual charts showing user progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - Professional code editor
- **Chart.js** - Data visualization
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing

### AI & External Services
- **Google Gemini AI** - Code analysis and review
- **MongoDB Atlas** - Cloud database hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key (for AI features)

### Quick Start
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Online-Judge-master
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Backend (.env)
   MONGODB_URI=your_mongodb_atlas_url
   SECRET_KEY=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   
   # Frontend (.env)
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
Online-Judge-master/
├── backend/                 # Backend server
│   ├── CC/                 # Code compilation modules
│   ├── controllers/        # Route controllers
│   ├── database/          # Database configuration
│   ├── middleware/        # Authentication middleware
│   ├── models/            # MongoDB schemas
│   ├── uploads/           # Temporary file storage
│   └── index.js           # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Static assets
│   │   └── styles/        # CSS files
│   ├── public/            # Public assets
│   └── package.json
├── keys/                  # API keys and certificates
└── docs/                  # Documentation
```

## 🔧 Installation

### Detailed Setup Instructions

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Database Setup**
   - Create MongoDB Atlas cluster
   - Get connection string
   - Update `MONGODB_URI` in backend `.env`

4. **AI Features Setup**
   - Get Google Gemini API key
   - Update `GEMINI_API_KEY` in backend `.env`

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
SECRET_KEY=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Judge My Code
```

## 🎯 Usage

### For Users
1. **Sign up/Login** to your account
2. **Browse problems** by difficulty or tags
3. **Write code** in your preferred language
4. **Submit solutions** and get instant feedback
5. **Use AI Review** for code improvement suggestions
6. **Track progress** through the dashboard

### For Administrators
1. **Login** with admin credentials
2. **Create new problems** with test cases
3. **Edit existing problems** and update content
4. **Delete problems** when necessary
5. **Manage user submissions** and analytics

## 👨‍💼 Admin Features

The platform includes comprehensive admin functionality:

- **Problem Management**: Create, edit, and delete coding problems
- **User Management**: Monitor user activities and submissions
- **Content Moderation**: Manage problem quality and relevance
- **Analytics Dashboard**: View platform usage statistics

For detailed admin documentation, see [ADMIN_FEATURES.md](ADMIN_FEATURES.md)

## 🤖 AI Review Feature

Powered by Google Gemini AI, the platform provides:

- **Code Quality Analysis**: Automated code review and suggestions
- **Best Practices**: Recommendations for better coding practices
- **Performance Tips**: Optimization suggestions
- **Security Analysis**: Security vulnerability detection

For detailed AI feature documentation, see [AI_REVIEW_FEATURE.md](AI_REVIEW_FEATURE.md)

## 📊 API Documentation

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `GET /check_if_admin` - Check admin status

### Problem Endpoints
- `GET /problems` - Get all problems
- `GET /problems/:id` - Get specific problem
- `POST /problems` - Create new problem (admin)
- `PUT /problems/:id` - Update problem (admin)
- `DELETE /problems/:id` - Delete problem (admin)

### Submission Endpoints
- `POST /submit` - Submit code solution
- `GET /submissions` - Get user submissions
- `POST /ai-review` - Get AI code review

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Cross-origin resource sharing configuration
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Protection against abuse
- **Admin Authorization**: Role-based access control


### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🙏 Acknowledgments

- **Google Gemini AI** for code analysis capabilities
- **MongoDB Atlas** for cloud database hosting
- **Monaco Editor** for the excellent code editing experience
- **Tailwind CSS** for the beautiful UI components





