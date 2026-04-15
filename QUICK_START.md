# Quick Start Reference

## 🚀 Quick Commands

### Start Both Servers (from project root)

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm start
```

---

## 📋 What's Included

### Backend (Node.js + Express + MongoDB)
✅ User authentication with JWT  
✅ Studio CRUD operations  
✅ Booking management system  
✅ Role-based access control  
✅ Real-time availability checking  
✅ Double-booking prevention  
✅ Input validation  
✅ Error handling  

### Frontend (React)
✅ Landing page with features  
✅ User authentication (Login/Register)  
✅ Studio discovery with filters  
✅ Studio detail page with booking form  
✅ Booking management  
✅ Studio owner dashboard  
✅ Responsive design  
✅ Context-based state management  

### Database Models
✅ User (Customer, Studio Owner, Admin)  
✅ Studio (with location, features, ratings)  
✅ Booking (with status tracking)  

---

## 🛠️ Configuration

### Environment Variables (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/studio_booking
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

---

## 📍 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000

---

## 👤 Test Accounts (After Creating)

**Customer:**
- Email: customer@test.com
- Password: test1234

**Studio Owner:**
- Email: owner@test.com
- Password: test1234

---

## 📚 File Structure

```
std-booking/
├── server/
│   ├── models/ (User, Studio, Booking)
│   ├── controllers/ (auth, studio, booking logic)
│   ├── routes/ (API endpoints)
│   ├── middleware/ (authentication)
│   └── server.js (Express app)
├── client/
│   ├── src/
│   │   ├── components/ (Navbar, StudioList)
│   │   ├── pages/ (Home, Login, Register, etc.)
│   │   ├── services/ (API calls)
│   │   ├── context/ (Auth state)
│   │   └── App.js (Main component)
├── README.md (Full documentation)
└── SETUP_GUIDE.md (Detailed setup)
```

---

## 🔗 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Studios
- GET /api/studios (with filters)
- GET /api/studios/:id
- POST /api/studios (Protected)
- PUT /api/studios/:id (Protected)
- DELETE /api/studios/:id (Protected)

### Bookings
- GET /api/bookings (Protected)
- POST /api/bookings (Protected)
- GET /api/bookings/:id (Protected)
- PUT /api/bookings/:id (Protected)
- PUT /api/bookings/:id/cancel (Protected)

---

## 🎯 Key Features

1. **Real-time Booking** - Instant confirmation
2. **Conflict Prevention** - No double-booking
3. **Role-based Access** - Customer, Owner, Admin
4. **Responsive Design** - Mobile & Desktop
5. **Secure Auth** - JWT + Password hashing
6. **Filter Studios** - By city, type, price

---

## 📖 Documentation

- **README.md** - Complete project overview
- **SETUP_GUIDE.md** - Step-by-step installation
- **server/README.md** - Backend API documentation
- **client/README.md** - Frontend documentation

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check Atlas IP whitelist, connection string |
| CORS error | Ensure both servers running, check proxy |
| Port in use | Kill process or change PORT in .env |
| npm install fails | Clear cache: `npm cache clean --force` |
| JWT error | Clear localStorage, logout/login |

---

## 🚀 Next Steps

1. Setup MongoDB at mongodb.com
2. Create .env file with credentials
3. Run backend: `npm run dev`
4. Run frontend: `npm start`
5. Register test accounts
6. Test booking workflow
7. Deploy to production

---

## 📝 Notes

- Password minimum length: 6 characters
- JWT expires in: 30 days
- Default port: 5000 (backend), 3000 (frontend)
- Initial setup may take 2-5 minutes

---

**Happy Booking! 🎬📷🎵**
