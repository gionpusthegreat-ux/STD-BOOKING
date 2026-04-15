# Studio Booking System - Frontend

A modern React-based frontend for the Studio Booking System, providing an intuitive interface for customers to book studios and for studio owners to manage their listings.

## Features

- **User Authentication**: Secure login and registration
- **Studio Discovery**: Browse and filter studios by location, type, and price
- **Real-time Bookings**: Check availability and book studios instantly
- **Booking Management**: View and manage your bookings
- **Admin Dashboard**: Studio owners can manage their studios and bookings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live availability and booking confirmations

## Tech Stack

- **React 18.2.0**: Modern UI library
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **CSS**: Custom styling with modern CSS features
- **Context API**: State management

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Setup

1. Navigate to the client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Navbar.js
│   ├── Navbar.css
│   ├── StudioList.js
│   └── StudioList.css
├── pages/               # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── StudioDetail.js
│   ├── MyBookings.js
│   └── OwnerDashboard.js
├── services/            # API services
│   └── api.js
├── context/             # Context providers
│   └── AuthContext.js
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## Available Pages

### Public Pages
- **Home** (`/`) - Landing page with features overview
- **Login** (`/login`) - User login page
- **Register** (`/register`) - User registration page
- **Studios** (`/studios`) - Browse all studios with filters
- **Studio Detail** (`/studios/:id`) - View detailed studio information and make bookings

### Protected Pages (Authentication Required)
- **My Bookings** (`/my-bookings`) - Customer's booking history
- **Owner Dashboard** (`/owner-dashboard`) - Studio owner management panel

## Usage

### For Customers

1. **Sign Up**: Create an account as a customer
2. **Browse Studios**: Navigate to the Studios page to see available studios
3. **Filter Studios**: Use filters to find studios by city, type, and price
4. **View Details**: Click on a studio to see detailed information
5. **Make Booking**: Select date and time to book a studio
6. **Manage Bookings**: View all your bookings in "My Bookings"

### For Studio Owners

1. **Sign Up**: Create an account as a studio owner
2. **Add Studio**: Go to Owner Dashboard and add your studio details
3. **Manage Studios**: View and manage all your studio listings
4. **Confirm Bookings**: Approve pending booking requests from customers
5. **Track Bookings**: Monitor all bookings for your studios

## API Integration

The frontend communicates with the backend API through the `services/api.js` module:

### Studio API
```javascript
studioAPI.getAll(filters) // Get all studios with optional filters
studioAPI.getById(id)      // Get specific studio
studioAPI.create(data)     // Create new studio
studioAPI.update(id, data) // Update studio
studioAPI.delete(id)       // Delete studio
```

### Booking API
```javascript
bookingAPI.getAll()        // Get user's bookings
bookingAPI.getById(id)     // Get specific booking
bookingAPI.create(data)    // Create new booking
bookingAPI.update(id, data) // Update booking
bookingAPI.cancel(id)      // Cancel booking
```

### Auth API
```javascript
authAPI.login(email, password)     // Login user
authAPI.register(data)             // Register new user
authAPI.getMe()                    // Get current user info
```

## Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. Token is stored in `localStorage` after login/registration
2. Token is automatically sent with all API requests
3. Auth context manages user state globally
4. Protected routes check authentication status

## Environment Configuration

By default, the app connects to `http://localhost:5000`. To change this:

1. Update the proxy in `package.json`:
```json
"proxy": "http://your-backend-url"
```

Or modify API calls in `src/services/api.js`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Styling

The app uses custom CSS with:
- CSS Grid and Flexbox for layouts
- CSS variables for theming
- Responsive design patterns
- Mobile-first approach

### Color Scheme
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#27ae60` (Green)
- Danger: `#e74c3c` (Red)
- Warning: `#f39c12` (Orange)

## Performance

- React.lazy (for code splitting)
- Context API (efficient state management)
- Optimized re-renders
- Minimal dependencies

## Known Issues and Limitations

1. Image upload not yet implemented (reference only)
2. Payment integration pending
3. Rating and review system UI only
4. Map integration for location not implemented

## Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS booking confirmations
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Video tours
- [ ] Live chat support
- [ ] Multi-language support

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
