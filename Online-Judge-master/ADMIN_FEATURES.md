# Admin Features Documentation

## Overview
This document describes the new admin functionality added to the Online Judge application, allowing admin users to manage problems (create, read, update, delete) while regular users can only view and solve problems.

## Admin User Setup

### Creating an Admin User
To create an admin user for testing, run the following script:

```bash
cd backend
node createAdmin.js
```

This will create an admin user with the following credentials:
- Email: admin@example.com
- Password: admin123

### Manual Admin Creation
Alternatively, you can manually create an admin user by:
1. Sign up normally through the application
2. Update the user's role in MongoDB Atlas to "admin"

## Admin Features

### 1. Problem Management
Admin users have access to the following problem management features:

#### Create Problems
- Navigate to `/problems_post` (only accessible to admins)
- Fill out the problem form with all required fields
- Submit to create a new problem

#### Edit Problems
- In the problems list, admin users see "Edit" and "Delete" buttons for each problem
- Click "Edit" to navigate to the edit form
- Modify any field and submit to update the problem

#### Delete Problems
- Click "Delete" button next to any problem
- Confirm deletion in the popup dialog
- Problem will be permanently removed from the database

### 2. Admin Interface Indicators
- Admin users see an "Admin" badge in the header
- "Create New Problem" button appears in the problems list
- Edit/Delete buttons appear for each problem in the list

## API Endpoints

### Admin-Only Endpoints

#### GET `/admin/problems/:id/edit`
- **Purpose**: Get problem data for editing
- **Access**: Admin only
- **Response**: Problem object with all fields

#### PUT `/admin/problems/:id`
- **Purpose**: Update an existing problem
- **Access**: Admin only
- **Body**: All problem fields (name, description, difficulty, etc.)
- **Response**: Updated problem object

#### DELETE `/admin/problems/:id`
- **Purpose**: Delete a problem permanently
- **Access**: Admin only
- **Response**: Deleted problem object

### Authentication Endpoints

#### GET `/check_if_admin`
- **Purpose**: Check if current user is admin
- **Access**: Authenticated users
- **Response**: `{ role: "admin" | "user", authorized: boolean }`

## Frontend Components

### EditProblem Component
- **File**: `frontend/src/EditProblem.jsx`
- **Route**: `/admin/problems/:id/edit`
- **Features**: 
  - Pre-populated form with existing problem data
  - Admin access validation
  - Error handling and loading states
  - Form validation

### Updated ProblemsList Component
- **File**: `frontend/src/ProblemsList.jsx`
- **Features**:
  - Admin role checking
  - Admin indicator in header
  - Create problem button for admins
  - Edit/Delete buttons for each problem

### Updated ShowSingleP Component
- **File**: `frontend/src/ShowSingleP.jsx`
- **Features**:
  - Admin action buttons (Edit/Delete)
  - Confirmation dialogs for deletion
  - Proper error handling

## Security Features

### Admin Middleware
- **File**: `backend/middleware/authMiddleware.js`
- **Function**: `requireAdmin`
- **Purpose**: Verify user authentication and admin role
- **Behavior**: Returns 401 for unauthenticated users, 403 for non-admin users

### Frontend Access Control
- All admin routes check for admin privileges
- Non-admin users are redirected with appropriate error messages
- Admin status is verified on component mount

## Error Handling

### Backend Errors
- 401: Unauthenticated user
- 403: Non-admin user trying to access admin features
- 404: Problem not found
- 500: Internal server error

### Frontend Error Handling
- Loading states for async operations
- User-friendly error messages
- Confirmation dialogs for destructive actions
- Automatic redirects for unauthorized access

## CSS Styling

### Admin Button Styles
- Edit button: Green background (#4CAF50)
- Delete button: Red background (#f44336)
- Admin indicator: Orange background (#ff9800)
- Create problem button: Blue background (#2196F3)

### Responsive Design
- Admin buttons adapt to different screen sizes
- Proper spacing and alignment in the problems list
- Consistent styling with existing components

## Testing

### Manual Testing Steps
1. Create an admin user using the script
2. Login as admin user
3. Verify admin indicators appear
4. Test creating a new problem
5. Test editing an existing problem
6. Test deleting a problem
7. Login as regular user and verify admin features are hidden

### API Testing
Use tools like Postman or curl to test the admin endpoints:

```bash
# Test admin check
curl -X GET http://localhost:5000/check_if_admin -H "Cookie: jwt=your_jwt_token"

# Test problem update
curl -X PUT http://localhost:5000/admin/problems/problem_id \
  -H "Content-Type: application/json" \
  -H "Cookie: jwt=your_jwt_token" \
  -d '{"name":"Updated Problem","description":"...","difficulty":"easy",...}'

# Test problem deletion
curl -X DELETE http://localhost:5000/admin/problems/problem_id \
  -H "Cookie: jwt=your_jwt_token"
```

## Future Enhancements

### Potential Improvements
1. **Bulk Operations**: Select multiple problems for bulk edit/delete
2. **Problem Categories**: Organize problems by categories or tags
3. **User Management**: Admin interface for managing users
4. **Analytics**: Problem usage statistics and analytics
5. **Audit Log**: Track changes made by admin users
6. **Problem Templates**: Pre-defined templates for common problem types

### Security Enhancements
1. **Rate Limiting**: Prevent abuse of admin endpoints
2. **Activity Logging**: Log all admin actions
3. **Two-Factor Authentication**: Additional security for admin accounts
4. **Session Management**: Better session handling for admin users

## Troubleshooting

### Common Issues

#### Admin buttons not appearing
- Check if user role is set to "admin" in database
- Verify `/check_if_admin` endpoint returns correct role
- Check browser console for errors

#### Edit/Delete operations failing
- Verify user is authenticated and has admin role
- Check if problem ID exists in database
- Review server logs for detailed error messages

#### Frontend not loading admin features
- Clear browser cache and cookies
- Verify API_BASE_URL is correctly set
- Check network tab for failed API requests

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify API responses in network tab
3. Check server logs for backend errors
4. Verify database connections and user data
5. Test API endpoints directly with tools like Postman
