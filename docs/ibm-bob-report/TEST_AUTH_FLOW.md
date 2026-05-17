# Authentication Flow Test Guide

## Prerequisites
1. Backend server running on `http://localhost:3001`
2. Frontend running on `http://localhost:5173`
3. Database connected and migrated

## Test Scenarios

### 1. User Registration Flow
**Steps:**
1. Open browser to `http://localhost:5173`
2. Click "Get Started" button on landing page
3. Should redirect to `/signup`
4. Fill in registration form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: password123
5. Click "Create Account"
6. Should see success toast
7. Should automatically redirect to `/dashboard`
8. Should see user profile in sidebar

**Expected Result:**
- User created in database
- JWT tokens stored in localStorage
- User authenticated and viewing dashboard

### 2. User Login Flow
**Steps:**
1. Logout if logged in
2. Navigate to `http://localhost:5173`
3. Click "Sign In" button in navbar
4. Should redirect to `/login`
5. Fill in login form:
   - Email: test@example.com
   - Password: password123
6. Click "Sign In"
7. Should see success toast
8. Should redirect to `/dashboard`

**Expected Result:**
- JWT tokens stored in localStorage
- User authenticated and viewing dashboard
- User profile visible in sidebar

### 3. Session Persistence
**Steps:**
1. Login successfully
2. Refresh the page (F5)
3. Should remain logged in
4. Should still see dashboard

**Expected Result:**
- No redirect to landing page
- User remains authenticated
- Dashboard loads properly

### 4. Protected Route Access
**Steps:**
1. Logout completely
2. Try to access `http://localhost:5173/dashboard` directly
3. Should redirect to landing page
4. Try to access `http://localhost:5173/repository-analyzer`
5. Should redirect to landing page

**Expected Result:**
- Unauthenticated users cannot access protected routes
- Automatic redirect to landing page

### 5. Token Refresh
**Steps:**
1. Login successfully
2. Wait for access token to expire (or manually delete from localStorage)
3. Make an API call (navigate to different dashboard page)
4. Should automatically refresh token
5. Should continue working without logout

**Expected Result:**
- Token refreshed automatically
- No interruption to user experience
- User remains authenticated

### 6. Logout Flow
**Steps:**
1. Login successfully
2. Navigate to dashboard
3. Click "Logout" button in sidebar
4. Should see logout success toast
5. Should redirect to landing page
6. Try to access `/dashboard` again
7. Should redirect to landing page

**Expected Result:**
- Tokens cleared from localStorage
- User logged out
- Cannot access protected routes

### 7. Get Started Flow (Authenticated)
**Steps:**
1. Login successfully
2. Navigate back to landing page `/`
3. Click "Get Started" button
4. Should redirect directly to `/dashboard` (not signup)

**Expected Result:**
- Authenticated users skip signup
- Direct access to dashboard

### 8. Dashboard Data Loading
**Steps:**
1. Login successfully
2. Navigate to `/dashboard`
3. Should see:
   - Welcome banner with user name
   - Stats cards with numbers
   - Weekly activity chart
   - Recent activity list
   - Recent projects (or empty state)

**Expected Result:**
- All dashboard sections load
- No errors in console
- Data displays properly (even if empty)

### 9. Navigation Between Modules
**Steps:**
1. Login successfully
2. Click each sidebar menu item:
   - Overview (Dashboard)
   - Repository Analyzer
   - Documentation Generator
   - Test Generator
   - Debug Assistant
   - AI Onboarding
   - Settings
3. Each page should load without errors

**Expected Result:**
- All pages accessible
- No blank screens
- No console errors
- Sidebar highlights active page

### 10. Repository Analyzer Module
**Steps:**
1. Login successfully
2. Navigate to Repository Analyzer
3. Enter GitHub URL: `https://github.com/example/repo`
4. Click "Analyze" button
5. Should show loading state
6. Should display analysis results after 2 seconds

**Expected Result:**
- Loading animation works
- Mock analysis results display
- No errors or crashes

## API Endpoints to Test

### Auth Endpoints
```bash
# Register
POST http://localhost:3001/api/v1/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}

# Login
POST http://localhost:3001/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

# Get Profile
GET http://localhost:3001/api/v1/auth/profile
Authorization: Bearer <access_token>

# Refresh Token
POST http://localhost:3001/api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

### User Endpoints
```bash
# Get Current User
GET http://localhost:3001/api/v1/users/me
Authorization: Bearer <access_token>

# Get User Stats
GET http://localhost:3001/api/v1/users/me/stats
Authorization: Bearer <access_token>

# Get User Activities
GET http://localhost:3001/api/v1/users/me/activities
Authorization: Bearer <access_token>
```

### Analytics Endpoints
```bash
# Get Analytics
GET http://localhost:3001/api/v1/analytics
Authorization: Bearer <access_token>

# Get Weekly Activity
GET http://localhost:3001/api/v1/analytics/weekly
Authorization: Bearer <access_token>
```

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** Ensure backend CORS_ORIGIN includes `http://localhost:5173`

### Issue: Database Connection Error
**Solution:** Check DATABASE_URL in server/.env

### Issue: JWT Secret Missing
**Solution:** Ensure JWT_SECRET is set in server/.env

### Issue: Tokens Not Persisting
**Solution:** Check browser localStorage, ensure no errors in console

### Issue: 401 Unauthorized
**Solution:** Token may be expired, try logging in again

### Issue: Profile Not Loading
**Solution:** Check network tab, ensure /auth/profile endpoint returns data

## Success Criteria

✅ User can register successfully
✅ User can login successfully  
✅ Session persists across page refresh
✅ Protected routes are actually protected
✅ Token refresh works automatically
✅ Logout clears session properly
✅ Dashboard loads with data
✅ All navigation works
✅ Repository Analyzer functions
✅ No console errors during normal flow

## Notes

- All passwords must be at least 8 characters
- Email must be valid format
- First and last names are required for registration
- Mock data is used for analytics and activities
- Repository analysis uses mock responses (no real GitHub API calls yet)