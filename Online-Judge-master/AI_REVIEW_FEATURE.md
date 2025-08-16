# AI Review Feature

## Overview
The AI Review feature provides users with AI-powered code analysis and suggestions after they submit their code to the online judge.

## Features

### 1. AI Review Button
- Located in the problem details page alongside Run, Submit buttons
- Initially disabled until user submits their code
- Becomes enabled after successful code submission
- Disabled for 4 seconds after clicking to prevent multiple requests

### 2. AI Review Page
- **Top Section**: Project title and "Go Back" button
- **Main Section**: Two side-by-side panels
  - **Left Panel**: "Your Code" - displays the submitted code in a formatted pre block
  - **Right Panel**: "AI Review" - displays AI-generated review using react-markdown

### 3. AI Review Content
The AI review includes:
- Code quality assessment
- Potential improvements
- Best practices suggestions
- Performance considerations
- Security considerations (if applicable)

## Technical Implementation

### Frontend Components
- `AIReviewPage.jsx` - Main AI review page component
- `AIReviewPage.css` - Styling for the AI review page
- Updated `ProblemDetails.jsx` - Added AI Review button functionality
- Updated `App.jsx` - Added routing for AI review page

### Backend Implementation
- `/ai-review` endpoint in `index.js`
- `generateAiReview.js` - Uses Google Gemini AI for code analysis
- Returns formatted Markdown response

### State Management
- `isAiReviewDisabled` - Controls button state
- `hasSubmitted` - Tracks if user has submitted code
- Loading and error states for better UX

## Usage Flow

1. User writes code in the problem details page
2. User clicks "Submit" button
3. After successful submission, "AI Review" button becomes enabled
4. User clicks "AI Review" button
5. Button is disabled for 4 seconds
6. User is navigated to AI Review page
7. AI review is automatically generated and displayed
8. User can navigate back to problem page using "Go Back" button

## Dependencies
- `react-markdown` - For rendering AI review content
- `@google/genai` - For AI code analysis
- `axios` - For API communication

## Error Handling
- Graceful handling of API errors
- Loading states during AI review generation
- Fallback messages for missing code
- Responsive design for different screen sizes

## Security
- AI Review only available after code submission
- Rate limiting through button disable mechanism
- Proper error handling and user feedback

