import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studioAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './StudioDetail.css';

export default function StudioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchStudio();
  }, [id]);

  const fetchStudio = async () => {
    try {
      setLoading(true);
      const response = await studioAPI.getById(id);
      setStudio(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load studio details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = () => {
    if (!bookingData.startTime || !bookingData.endTime) return 0;
    const start = new Date(`2000-01-01 ${bookingData.startTime}`);
    const end = new Date(`2000-01-01 ${bookingData.endTime}`);
    return (end - start) / (1000 * 60 * 60);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const duration = calculateDuration();
    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    try {
      setBookingLoading(true);
      await bookingAPI.create({
        studio: id,
        bookingDate: bookingData.bookingDate,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        duration,
        purpose: bookingData.purpose
      });
      alert('Booking request submitted successfully!');
      setShowBookingForm(false);
      navigate('/my-bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading studio details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!studio) return <div>Studio not found</div>;

  const duration = calculateDuration();
  const totalAmount = duration > 0 ? studio.hourlyRate * duration : 0;

  return (
    <div className="studio-detail-container">
      <div className="studio-detail">
        <div className="studio-images">
          {studio.images && studio.images.length > 0 ? (
            <img src={studio.images[0]} alt={studio.name} className="main-image" />
          ) : (
            <div className="placeholder">📷</div>
          )}
        </div>

        <div className="studio-details">
          <h1>{studio.name}</h1>
          <div className="studio-meta">
            <span className="type">
              {studio.studioType.charAt(0).toUpperCase() + studio.studioType.slice(1)}
            </span>
            <span className="rating">⭐ {studio.rating.toFixed(1)}</span>
          </div>

          <div className="studio-info-box">
            <p><strong>Location:</strong> {studio.location.address}, {studio.location.city}</p>
            <p><strong>Phone:</strong> {studio.location.phone}</p>
            <p><strong>Hourly Rate:</strong> ₨{studio.hourlyRate}</p>
            <p><strong>Capacity:</strong> {studio.capacity} people</p>
          </div>

          {studio.description && (
            <div className="description">
              <h3>Description</h3>
              <p>{studio.description}</p>
            </div>
          )}

          {studio.features && studio.features.length > 0 && (
            <div className="features">
              <h3>Features</h3>
              <ul>
                {studio.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="operating-hours">
            <h3>Operating Hours</h3>
            {studio.operatingHours && Object.entries(studio.operatingHours).map(([day, hours]) => (
              <p key={day}>
                <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours.start} - {hours.end}
              </p>
            ))}
          </div>

          {!showBookingForm ? (
            <button
              onClick={() => setShowBookingForm(true)}
              className="book-btn"
            >
              Make a Booking
            </button>
          ) : (
            <div className="booking-form">
              <h3>Book This Studio</h3>
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label>Booking Date</label>
                  <input
                    type="date"
                    value={bookingData.bookingDate}
                    onChange={(e) => setBookingData({ ...bookingData, bookingDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={bookingData.startTime}
                      onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={bookingData.endTime}
                      onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Purpose</label>
                  <input
                    type="text"
                    placeholder="e.g., Music Recording"
                    value={bookingData.purpose}
                    onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                  />
                </div>

                <div className="booking-summary">
                  <p><strong>Duration:</strong> {duration} hours</p>
                  <p><strong>Total Amount:</strong> ₨{totalAmount.toFixed(2)}</p>
                </div>

                <div className="button-group">
                  <button type="submit" disabled={bookingLoading} className="submit-btn">
                    {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
