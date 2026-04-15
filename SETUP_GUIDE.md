# Studio Booking System - Detailed Setup Guide

Complete step-by-step guide for setting up and running the Studio Booking System locally.

## Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - Free tier available at [mongodb.com](https://www.mongodb.com)
- **Git** (optional) - For version control
- **Code Editor** - VS Code recommended

## Backend Setup

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- validator
- nodemon (dev dependency)

### Step 3: Create Environment File
```bash
cp .env.example .env
```

Or manually create `.env` file with:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studio_booking
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

### Step 4: Configure MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Create account or sign in
4. Create new cluster (Free tier)
5. Choose cloud provider and region
6. Click "Create"
7. Wait for cluster creation (2-3 minutes)
8. Go to "Clusters" → Click "Connect"
9. Choose "Connect your application"
10. Select "Node.js" and version
11. Copy connection string
12. Paste in `.env` file, replace `<username>`, `<password>`, and `studio_booking` with your credentials

#### Option B: Local MongoDB
1. Install MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Follow installation instructions for your OS
3. Start MongoDB service
4. In `.env`, use:
```
MONGODB_URI=mongodb://localhost:27017/studio_booking
```

### Step 5: Generate JWT Secret
Create a secure JWT secret:
```bash
# Option 1: Use OpenSSL
openssl rand -base64 32

# Option 2: Use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Use any online generator (https://www.random.org/strings/)
```

Copy the generated string to `.env`:
```
JWT_SECRET=your_generated_secret_here
```

### Step 6: Start Backend Server

#### Development Mode (with Auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

**Expected Output:**
```
Server is running on port 5000
MongoDB connected successfully
```

✅ Backend is now running on `http://localhost:5000`

## Frontend Setup

### Step 1: Open New Terminal
Keep the backend running, open a new terminal window

### Step 2: Navigate to Client Directory
```bash
cd client
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

### Step 4: Start Development Server
```bash
npm start
```

This will:
- Install dependencies if needed
- Start the React developer server
- Open browser automatically to `http://localhost:3000`

**Expected Output:**
```
Compiled successfully!

You can now view studio-booking-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ Frontend is now running on `http://localhost:3000`

## Testing the Application

### Create Test Accounts

#### Customer Account
1. Go to http://localhost:3000/register
2. Fill in details:
   - Name: John Customer
   - Email: customer@test.com
   - Phone: 9841234567
   - Account Type: Customer
   - Password: test1234
3. Click "Sign Up"
4. You'll be redirected to home page

#### Studio Owner Account
1. Go to http://localhost:3000/register
2. Fill in details:
   - Name: Studio Owner
   - Email: owner@test.com
   - Phone: 9842345678
   - Account Type: Studio Owner
   - Password: test1234
3. Click "Sign Up"
4. You'll be redirected to Studio Owner Dashboard

### Test Workflow

#### As Studio Owner
1. Login with owner account
2. Click "My Studios" or go to `/owner-dashboard`
3. Click "+ Add New Studio"
4. Fill studio details:
   - Studio Name: Test Recording Studio
   - Type: Recording
   - City: Kathmandu
   - Capacity: 5
   - Rate: 500
5. Click "Add Studio"
6. Studio appears in list

#### As Customer
1. Logout and login as customer
2. Go to "Studios"
3. See the studio you created
4. Click "View Details"
5. Click "Make a Booking"
6. Fill booking details:
   - Date: Select future date
   - Start Time: 10:00
   - End Time: 12:00
   - Purpose: Music Recording
7. Click "Confirm Booking"

#### As Studio Owner (Managing Booking)
1. Logout and login as owner
2. Go to Dashboard
3. See booking request in "Booking Requests"
4. Click "Confirm Booking"
5. Status changes to "Confirmed"

## API Testing with Postman/Insomnia

### 1. Register New User
- **Method:** POST
- **URL:** http://localhost:5000/api/auth/register
- **Body (JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "9841234567",
  "userType": "customer"
}
```

### 2. Login
- **Method:** POST
- **URL:** http://localhost:5000/api/auth/login
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response includes JWT token**

### 3. Get All Studios
- **Method:** GET
- **URL:** http://localhost:5000/api/studios?city=Kathmandu&studioType=recording&minPrice=400&maxPrice=600

### 4. Create Studio (Protected)
- **Method:** POST
- **URL:** http://localhost:5000/api/studios
- **Headers:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```
- **Body (JSON):**
```json
{
  "name": "My Studio",
  "studioType": "recording",
  "capacity": 5,
  "hourlyRate": 500,
  "location": {
    "address": "123 Main St",
    "city": "Kathmandu",
    "phone": "9841234567"
  },
  "description": "Professional recording studio"
}
```

### 5. Create Booking (Protected)
- **Method:** POST
- **URL:** http://localhost:5000/api/bookings
- **Headers:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```
- **Body (JSON):**
```json
{
  "studio": "<STUDIO_ID>",
  "bookingDate": "2024-12-20",
  "startTime": "10:00",
  "endTime": "12:00",
  "duration": 2,
  "purpose": "Music Recording"
}
```

## Troubleshooting

### Issue: Cannot connect to MongoDB
**Solutions:**
1. Check internet connection
2. Verify MongoDB Atlas IP whitelist (set to 0.0.0.0/0 for development)
3. Verify username/password in connection string
4. Check connection string in .env file

### Issue: Port 5000 already in use
**Solutions:**
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Or use different port in .env:
```
PORT=5001
```

### Issue: Port 3000 already in use
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: npm install fails
**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install
```

### Issue: CORS error when calling API
**Check:**
1. Backend CORS is enabled (already configured)
2. Both servers are running
3. Frontend proxy is correct in package.json
4. API URL in api.js matches backend URL

### Issue: JWT authentication fails
**Solutions:**
1. Clear browser localStorage
2. Logout and login again
3. Verify JWT_SECRET in .env file
4. Check token expiration (set to 30 days)

## Database Seeding (Optional)

Create sample data in MongoDB (manual process):

### Using MongoDB Atlas UI
1. Go to Collections
2. Insert sample documents

Or use MongoDB Compass (GUI):
1. Download MongoDB Compass
2. Connect with your connection string
3. Create database: `studio_booking`
4. Create collections: `users`, `studios`, `bookings`
5. Insert sample documents

## Monitoring

### Backend Logs
When running `npm run dev`:
- Shows all API requests
- MongoDB connection status
- Error messages

### Frontend Console
In browser DevTools (F12):
- Console tab: JavaScript errors
- Network tab: API calls
- Application tab: LocalStorage (JWT token)

## Performance Tips

### Backend
- Use indexed queries for frequent lookups
- Limit returned fields in queries
- Cache frequently accessed data

### Frontend
- Use React DevTools for profiling
- Check Network tab for large payloads
- Optimize images

## Next Steps

1. Customize styling and colors
2. Add payment integration (Stripe/Khalti)
3. Implement email notifications
4. Add user profile editing
5. Create admin dashboard
6. Deploy to production

## Production Deployment

### Prepare for Production
```bash
# Backend
NODE_ENV=production npm start

# Frontend
npm run build
```

### Deploy Backend (Heroku)
```bash
heroku create studio-booking-api
heroku config:set MONGODB_URI="your_connection_string"
heroku config:set JWT_SECRET="your_secret"
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
npm install -g vercel
vercel
# Follow prompts
```

## Support

- Check backend logs for API errors
- Check browser console for frontend errors
- Review request/response in Network tab
- Check MongoDB logs

---

**Setup Complete!** 🎉

Your Studio Booking System is now ready to use. Start with creating accounts and testing the booking workflow.
