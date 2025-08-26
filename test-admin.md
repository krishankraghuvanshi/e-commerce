# Admin Functionality Test Guide

## Prerequisites
1. Backend server running on port 5001
2. Frontend running on port 3000
3. MongoDB connected
4. Sample data seeded

## Test Steps

### 1. Login as Admin
- Navigate to `/login`
- Use credentials: `admin@emailcom` / `123456`
- Verify you see the Admin dropdown in the header

### 2. Test Admin Dashboard
- Click Admin → Dashboard
- Verify all three cards are displayed (Products, Users, Orders)
- Test navigation links

### 3. Test Product Management
- Go to Admin → Products
- Verify product list displays with images
- Test Create Product button
- Test Edit button on existing products
- Test Delete button with confirmation modal

### 4. Test Product Creation/Editing
- Create a new product
- Test image upload functionality
- Verify form validation
- Test editing existing products
- Verify image preview works

### 5. Test User Management
- Go to Admin → Users
- Verify user list displays
- Test Edit User functionality
- Test Delete User (should be disabled for admin users)
- Verify admin privilege toggle works

### 6. Test Image Upload
- In product creation/editing
- Upload an image file
- Verify it appears in preview
- Verify it's saved to uploads folder
- Test image removal

### 7. Test API Endpoints
- Verify all CRUD operations work
- Check authentication/authorization
- Verify image upload endpoint
- Test error handling

## Expected Results
- All admin functions should work smoothly
- Images should upload and display correctly
- CRUD operations should work for products and users
- Admin-only access should be enforced
- Proper error messages should display
- Loading states should work
- Toast notifications should appear

## Troubleshooting
- Check browser console for errors
- Verify backend server is running
- Check MongoDB connection
- Verify file permissions for uploads folder
- Check CORS configuration
