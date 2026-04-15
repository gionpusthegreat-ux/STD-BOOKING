import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getAll();
      setBookings(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancel(bookingId);
      alert('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'completed': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'confirmed': '#27ae60',
      'pending': '#f39c12',
      'completed': '#3498db',
      'cancelled': '#e74c3c'
    };
    return (
      <span className="status-badge" style={{ backgroundColor: colors[status] }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <a href="/studios" className="browse-link">Browse Studios</a>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.studio.name}</h3>
                {getStatusBadge(booking.status)}
              </div>

              <div className="booking-details">
                <p>
                  <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                </p>
                <p>
                  <strong>Duration:</strong> {booking.duration} hours
                </p>
                <p>
                  <strong>Total Amount:</strong> ₨{booking.totalAmount.toFixed(2)}
                </p>
                {booking.purpose && (
                  <p>
                    <strong>Purpose:</strong> {booking.purpose}
                  </p>
                )}
              </div>

              <div className="payment-status">
                <p>
                  <strong>Payment Status:</strong>
                  <span className={`payment-${booking.paymentStatus}`}>
                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                  </span>
                </p>
              </div>

              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="cancel-booking-btn"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
