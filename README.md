# Studio Booking System - Complete MERN Stack Project

A comprehensive, production-ready Studio Booking System built with MERN (MongoDB, Express, React, Node.js) stack, designed for managing studio bookings in Nepal's creative industries.

## Project Overview

### Problem Statement
In Nepal, studio owners face difficulties in managing bookings due to the absence of a centralized digital system. Manual booking methods lead to:
- Double bookings
- Missed appointments
- Lack of proper records
- Inefficient use of studio time
- Poor customer communication

### Solution
This project provides a complete digital platform for:
- **Customers**: Easy studio discovery and booking
- **Studio Owners**: Efficient booking management and studio administration
- **Administrators**: System oversight and management

## Key Features

### For Customers
- User authentication and profile management
- Browse studios by location, type, and price
- Real-time availability checking
- Instant booking confirmation
- Booking history and management
- Cancel bookings with notifications

### For Studio Owners
- Create and manage multiple studio listings
- Set hourly rates and operating hours
- View real-time booking requests
- Confirm or reject bookings
- Track revenue and bookings
- Studio analytics

### System Features
- JWT-based authentication
- Role-based access control (Customer, Studio Owner, Admin)
- Real-time availability management
- Double-booking prevention
- Secure payment tracking
- Responsive design (Mobile, Tablet, Desktop)
- Production-ready error handling

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling)
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management
- **CSS3**: Styling with responsive design

### Development & Deployment
- **npm**: Package management
- **Nodemon**: Development auto-reload
- **Git**: Version control

## Project Structure

```
std-booking/
├── server/                          # Backend API
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Studio.js               # Studio schema
│   │   └── Booking.js              # Booking schema
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── studioController.js     # Studio logic
│   │   └── bookingController.js    # Booking logic
│   ├── routes/
│   │   ├── auth.js                 # Auth routes
│   │   ├── studios.js              # Studio routes
│   │   └── bookings.js             # Booking routes
│   ├── middleware/
│   │   └── auth.js                 # Auth middleware
│   ├── server.js                   # Express app setup
│   ├── package.json                # Dependencies
│   ├── .env.example                # Environment template
│   └── README.md                   # Backend documentation
│
├── client/                          # Frontend React App
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           # Navigation
│   │   │   ├── Navbar.css
│   │   │   ├── StudioList.js       # Studios listing
│   │   │   └── StudioList.css
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Home.css
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Register.js         # Registration page
│   │   │   ├── Auth.css
│   │   │   ├── StudioDetail.js     # Studio details
│   │   │   ├── StudioDetail.css
│   │   │   ├── MyBookings.js       # Customer bookings
│   │   │   ├── MyBookings.css
│   │   │   ├── OwnerDashboard.js   # Owner panel
│   │   │   └── OwnerDashboard.css
│   │   ├── services/
│   │   │   └── api.js              # API endpoints
│   │   ├── context/
│   │   │   └── AuthContext.js      # Auth context
│   │   ├── App.js                  # Main component
│   │   ├── App.css
│   │   ├── index.js                # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── .gitignore
│   ├── README.md                   # Frontend documentation
│   └── public/index.html
│
├── README.md                        # This file
└── SETUP_GUIDE.md                  # Detailed setup instructions
```

## Installation & Setup

### Option 1: Quick Setup

#### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

#### Frontend Setup (in a new terminal)
```bash
cd client
npm install
npm start
```

### Option 2: Detailed Setup
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for comprehensive setup instructions.

## Database Setup

### MongoDB
1. Create MongoDB account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string
4. Update `.env` with connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studio_booking
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Studio Endpoints
- `GET /api/studios` - List studios (with filters)
- `GET /api/studios/:id` - Get studio details
- `POST /api/studios` - Create studio (Protected)
- `PUT /api/studios/:id` - Update studio (Protected)
- `DELETE /api/studios/:id` - Delete studio (Protected)

### Booking Endpoints
- `GET /api/bookings` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking details (Protected)
- `POST /api/bookings` - Create booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App opens at http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd server
NODE_ENV=production npm start
```

**Frontend:**
```bash
cd client
npm run build
# Optimized build in build/ directory
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/studio_booking
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend
Update proxy in `package.json` or API endpoints in `src/services/api.js`

## User Roles

### Customer
- Browse studios
- Make bookings
- Manage bookings
- Cancel bookings
- View booking history

### Studio Owner
- Create and manage studios
- Set availability and rates
- Review booking requests
- Confirm/reject bookings
- View booking analytics

### Admin
- System oversight
- User management
- Studio management
- Booking management

## Key Features Explained

### Real-time Booking
- Check availability instantly
- Prevents double-booking
- Calculates total cost automatically
- Sends confirmation immediately

### Authentication
- Secure JWT-based auth
- Password hashing with bcryptjs
- Role-based access control
- Protected routes

### Studio Filtering
- Filter by location (city)
- Filter by studio type
- Filter by price range
- Combination filtering

### Booking Management
- View all bookings
- Cancel bookings
- Track payment status
- Update booking details

## Error Handling

All API responses follow consistent format:
```json
{
  "success": true/false,
  "data": {},
  "message": "Success or error message"
}
```

## Security Measures

- Password hashing with bcryptjs
- JWT authentication
- CORS configuration
- Input validation
- Role-based access control
- Protected routes (Frontend & Backend)

## Performance Optimizations

- React.lazy for code splitting
- Context API for state management
- Efficient database queries
- Indexed MongoDB collections
- Responsive design
- CSS optimization

## Testing

### Manual Testing
1. Create customer account and test booking flow
2. Create studio owner account and test studio management
3. Test booking cancellation
4. Test pagination and filtering

### API Testing (using Postman/Insomnia)
- Test endpoints with authentication tokens
- Test error scenarios
- Test input validation

## Deployment

### Backend (Heroku)
1. `heroku create app-name`
2. Add MongoDB Atlas connection
3. Set environment variables
4. `git push heroku main`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy build folder
3. Configure environment variables
4. Set up domain

## Future Enhancements

- [ ] Payment gateway integration (Stripe/Khalti)
- [ ] Email notifications
- [ ] SMS confirmations
- [ ] Advanced analytics dashboard
- [ ] Rating and review system
- [ ] Video studio tours
- [ ] Live chat support
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advance booking calendar

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Check connection string in .env
- Verify MongoDB is running
- Check IP whitelist in MongoDB Atlas

### CORS Error
- Verify frontend URL in server CORS config
- Check axios headers

### Authentication Issues
- Clear localStorage
- Check JWT_SECRET in .env
- Verify token expiration

## Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/Feature`
3. Commit changes: `git commit -m 'Add Feature'`
4. Push to branch: `git push origin feature/Feature`
5. Open Pull Request

## Code Standards

- Use consistent naming conventions
- Add comments for complex logic
- Handle errors appropriately
- Write responsive CSS
- Use meaningful variable names
- Follow ES6+ conventions

## License
ISC

## Support & Contact
For issues and questions:
- Open GitHub issues
- Email: support@studiobooking.local
- Check documentation

## Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [JWT Authentication](https://jwt.io)

## Credits

**Project by:** Immanuel Lama  
**Institution:** Lincoln University College  
**Program:** Bachelor in Information Technology (BIT)  
**Semester:** 7th Semester  
**University ID:** LC0003001658

---

## Summary

This Studio Booking System is a complete, production-ready MERN application designed to digitize and streamline studio booking processes in Nepal. It provides an intuitive interface for customers to book studios and efficient management tools for studio owners.

The system addresses real-world problems in Nepal's creative industries by eliminating manual booking processes, preventing double-bookings, and providing real-time availability information.

**Start booking studios today! 🎬📷🎵**
#   s t u d i o - b o o k i n g - s y s t e m  
 