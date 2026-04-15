# Registration Flow - Complete Walkthrough

## 🔄 Step-by-Step Process

### **STEP 1: User Submits Form (Client-Side)**
**File:** `client/src/pages/Register.js`

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.userType
    );
    navigate('/');  // Redirects to home after success
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};
```

**What happens:**
- User fills in: Name, Email, Password, Phone, User Type
- Clicks "Sign Up" button
- Form data is passed to the `register()` function from AuthContext

---

### **STEP 2: AuthContext Makes API Request**
**File:** `client/src/context/AuthContext.js`

```javascript
const register = async (name, email, password, phone, userType) => {
  // Makes HTTP POST request to the server
  const response = await axios.post('/api/auth/register', {
    name,
    email,
    password,
    phone,
    userType
  });
  
  const { token: newToken, user: userData } = response.data;
  
  // Store token in browser's localStorage
  localStorage.setItem('token', newToken);
  setToken(newToken);
  setUser(userData);
  
  return response.data;
};
```

**What happens:**
- Sends POST request to `http://localhost:5000/api/auth/register`
- Request body contains user data
- Waits for server response
- If successful, saves the JWT token to localStorage

---

### **STEP 3: Server Receives Request (Backend)**
**File:** `server/routes/auth.js`

```javascript
router.post('/register', register);
```

**What happens:**
- Express route receives the POST request
- Calls the `register` controller function

---

### **STEP 4: Controller Validates & Creates User**
**File:** `server/controllers/authController.js`

```javascript
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    // VALIDATION: Check all required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // CHECK: Does user already exist?
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // CREATE: Save new user to database
    user = await User.create({
      name,
      email,
      password,        // Plain text (will be hashed by middleware)
      phone,
      userType: userType || 'customer'
    });

    // GENERATE: JWT token for authentication
    const token = generateToken(user._id, user.userType);

    // SEND: Response back to client with token and user data
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};
```

**What happens:**
1. Gets data from request body
2. Validates all required fields exist
3. Checks if email already exists in database
4. Creates new User document
5. Generates JWT token
6. Sends response back to client

---

### **STEP 5: Password Gets Hashed (Middleware)**
**File:** `server/models/User.js`

```javascript
// This runs BEFORE the user is saved to database
userSchema.pre('save', async function(next) {
  // If password wasn't changed, skip hashing
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt (adds randomness to hash)
    const salt = await bcrypt.genSalt(10);
    
    // Hash the plain text password with the salt
    // BEFORE: "password123" (plain text)
    // AFTER:  "$2a$10$xxxxxxxxxxxxx..." (hashed)
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error) {
    next(error);
  }
});
```

**What happens:**
- Before user is saved, bcrypt hashes the password
- Original password is replaced with hashed version
- Password can never be reversed (one-way encryption)

---

### **STEP 6: Data Saved to MongoDB**
**File:** MongoDB Database

```
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$N9qo8uLO...",  ← HASHED (not plain text!)
  phone: "9841234567",
  userType: "customer",
  address: undefined,
  profileImage: undefined,
  createdAt: 2026-04-14T10:30:00.000Z
}
```

**What happens:**
- User document inserted into MongoDB `users` collection
- All fields stored exactly as defined in schema
- Timestamps automatically added
- Password is hashed (secure!)

---

### **STEP 7: Client Receives Response**
Back in `client/src/context/AuthContext.js`:

```javascript
// Response data:
{
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "507f1f77bcf86cd799439011",
    name: "John Doe",
    email: "john@example.com",
    userType: "customer"
  }
}
```

**What happens:**
- Token saved to localStorage
- User data saved to React state
- User is now authenticated
- Redirect to home page
- App shows "Welcome, John Doe"

---

## 🔐 Security Features

| Step | Security |
|------|----------|
| **Password Transmission** | Sent via HTTPS (encrypted in transit) |
| **Password Storage** | Hashed with bcryptjs (10 salt rounds) |
| **Authentication** | JWT tokens (contain user ID + type, expires in 30 days) |
| **Duplicate Prevention** | Email must be unique in database |
| **Validation** | All required fields checked |

---

## 📊 Data Flow Diagram

```
FRONTEND                        BACKEND                    DATABASE
========                        =======                    ========

User Form
  |
  v
Register.js
  |
  +---> AuthContext.register()
         |
         +---> axios.post('/api/auth/register')
                |
                +------ HTTP POST ------>  routes/auth.js
                                           |
                                           v
                                    authController.register()
                                           |
                                           +---> Validate data
                                           +---> Check if email exists
                                           +---> User.create()
                                                  |
                                                  v
                                           userSchema.pre('save')
                                           (Hash password)
                                                  |
                                                  v
                                           MongoDB insert
                                           (Document saved)
                                           |
                                           v
                                      Generate JWT token
                                           |
                        <----- JSON Response ------+
                        |
                        v
               Store token in localStorage
               Save user to state
               Redirect to home
```

---

## 🔍 Example: Complete Registration

**1. User fills form:**
- Name: "Alice Smith"
- Email: "alice@example.com"
- Password: "securepass123"
- Phone: "9841234567"
- Type: "customer"

**2. Frontend sends:**
```json
POST /api/auth/register
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "password": "securepass123",
  "phone": "9841234567",
  "userType": "customer"
}
```

**3. Backend processes:**
- ✅ Validates all fields present
- ✅ Checks alice@example.com doesn't exist
- ✅ Creates User document
- ✅ Hashes password → "$2a$10$x7xZ9kL2..."
- ✅ Saves to MongoDB
- ✅ Generates token → "eyJhbGciOiJIUz..."

**4. Backend responds:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUz...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "userType": "customer"
  }
}
```

**5. Frontend:**
- ✅ Stores token
- ✅ Logs user in
- ✅ Redirects to home
- ✅ Shows personalized greeting

**6. MongoDB stores:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Alice Smith",
  "email": "alice@example.com",
  "password": "$2a$10$x7xZ9kL2MkFLaGBi...",
  "phone": "9841234567",
  "userType": "customer",
  "createdAt": "2026-04-14T10:45:23.000Z"
}
```

---

## ❓ Common Questions

**Q: Why is the password hashed?**
A: So even if MongoDB is breached, attackers can't see the plain passwords.

**Q: Can passwords be recovered?**
A: No! Hashing is one-way. That's why you need a "Reset Password" feature.

**Q: What is the JWT token?**
A: A secure token that proves the user is logged in (lasts 30 days).

**Q: Where is the token stored?**
A: In browser's localStorage. Sent with every authenticated request.

**Q: Can anyone create an account?**
A: Yes, the register route is public (no authentication required).
