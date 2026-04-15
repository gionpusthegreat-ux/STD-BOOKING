# Studio Booking System - Backend API

A Node.js/Express API for a comprehensive studio booking management system designed for Nepal's creative industries.

## Features

- **User Authentication**: Secure user registration and login with JWT
- **Studio Management**: Create, read, update, and delete studio listings
- **Booking System**: Real-time booking with conflict prevention
- **Role-Based Access**: Customer, Studio Owner, and Admin roles
- **Real-time Availability**: Check studio availability in real-time
- **Payment Tracking**: Track booking payments and statuses

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup

1. Clone the repository or navigate to the server directory
```bash
cd server
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studio_booking
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=development
```

5. Start the server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Studios
- `GET /api/studios` - Get all studios with filtering
- `GET /api/studios/:id` - Get studio details
- `POST /api/studios` - Create new studio (Protected - Studio Owner)
- `PUT /api/studios/:id` - Update studio (Protected - Studio Owner)
- `DELETE /api/studios/:id` - Delete studio (Protected - Studio Owner)

### Bookings
- `GET /api/bookings` - Get user's bookings (Protected)
- `GET /api/bookings/:id` - Get booking details (Protected)
- `POST /api/bookings` - Create booking (Protected - Customer)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  userType: 'customer' | 'studio_owner' | 'admin',
  profileImage: String,
  address: String,
  createdAt: Date
}
```

### Studio
```javascript
{
  name: String,
  owner: ObjectId (ref: User),
  description: String,
  location: {
    address: String,
    city: String,
    phone: String,
    latitude: Number,
    longitude: Number
  },
  studioType: 'recording' | 'photography' | 'videography' | 'rehearsal' | 'multi-purpose',
  capacity: Number,
  features: [String],
  hourlyRate: Number,
  images: [String],
  availability: Map,
  operatingHours: { day: { start, end } },
  rating: Number,
  reviews: [{ user, rating, comment, date }],
  createdAt: Date
}
```

### Booking
```javascript
{
  bookingId: String (unique),
  customer: ObjectId (ref: User),
  studio: ObjectId (ref: Studio),
  bookingDate: Date,
  startTime: String (HH:mm),
  endTime: String (HH:mm),
  duration: Number (hours),
  totalAmount: Number,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed',
  purpose: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All API errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation
- CORS enabled

## Development

### Running Tests (if applicable)
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

### Environment Setup for Production
1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB instance
3. Set a strong `JWT_SECRET`
4. Configure proper CORS origins

### Recommended Deployment Platforms
- Heroku
- AWS
- DigitalOcean
- Railway

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
ISC

## Support
For issues and questions, please open an issue in the repository.

## Author
Immanuel Lama - BIT 7th Semester, Lincoln University College
