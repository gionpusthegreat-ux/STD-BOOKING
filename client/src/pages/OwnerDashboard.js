import React, { useState, useEffect } from 'react';
import { studioAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './OwnerDashboard.css';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [studios, setStudios] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddStudio, setShowAddStudio] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    studioType: 'recording',
    capacity: '',
    hourlyRate: '',
    location: { address: '', city: '', phone: '' }
  });

  useEffect(() => {
    fetchStudiosAndBookings();
  }, []);

  const fetchStudiosAndBookings = async () => {
    try {
      setLoading(true);
      const [studiosRes, bookingsRes] = await Promise.all([
        studioAPI.getAll({}),
        bookingAPI.getAll()
      ]);

      // Filter studios owned by current user
      const myStudios = studiosRes.data.data.filter(s => s.owner === user?.id);
      setStudios(myStudios);
      setBookings(bookingsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddStudio = async (e) => {
    e.preventDefault();
    try {
      await studioAPI.create(formData);
      alert('Studio added successfully!');
      setFormData({
        name: '',
        description: '',
        studioType: 'recording',
        capacity: '',
        hourlyRate: '',
        location: { address: '', city: '', phone: '' }
      });
      setShowAddStudio(false);
      fetchStudiosAndBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add studio');
    }
  };

  const handleDeleteStudio = async (studioId) => {
    if (!window.confirm('Are you sure you want to delete this studio?')) return;

    try {
      await studioAPI.delete(studioId);
      alert('Studio deleted successfully');
      fetchStudiosAndBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete studio');
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      await bookingAPI.update(bookingId, { status: 'confirmed' });
      alert('Booking confirmed!');
      fetchStudiosAndBookings();
    } catch (error) {
      alert('Failed to confirm booking');
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="owner-dashboard-container">
      <div className="dashboard-header">
        <h1>Studio Owner Dashboard</h1>
        {!showAddStudio && (
          <button onClick={() => setShowAddStudio(true)} className="add-studio-btn">
            + Add New Studio
          </button>
        )}
      </div>

      {showAddStudio && (
        <div className="add-studio-form-section">
          <h2>Add New Studio</h2>
          <form onSubmit={handleAddStudio} className="add-studio-form">
            <div className="form-row">
              <div className="form-group">
                <label>Studio Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Crystal Sound Studio"
                />
              </div>

              <div className="form-group">
                <label>Studio Type</label>
                <select name="studioType" value={formData.studioType} onChange={handleInputChange}>
                  <option value="recording">Recording</option>
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="rehearsal">Rehearsal</option>
                  <option value="multi-purpose">Multi-purpose</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your studio..."
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Capacity (people)</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Hourly Rate (₨)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="location.phone"
                value={formData.location.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">Add Studio</button>
              <button
                type="button"
                onClick={() => setShowAddStudio(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-section">
        <h2>My Studios ({studios.length})</h2>
        {studios.length === 0 ? (
          <p className="empty-message">You haven't added any studios yet.</p>
        ) : (
          <div className="studios-grid">
            {studios.map(studio => (
              <div key={studio._id} className="studio-dashboard-card">
                <h3>{studio.name}</h3>
                <p><strong>Type:</strong> {studio.studioType}</p>
                <p><strong>Location:</strong> {studio.location.city}</p>
                <p><strong>Rate:</strong> ₨{studio.hourlyRate}/hour</p>
                <p><strong>Capacity:</strong> {studio.capacity} people</p>
                <button
                  onClick={() => handleDeleteStudio(studio._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Booking Requests</h2>
        {bookings.length === 0 ? (
          <p className="empty-message">No booking requests.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking._id} className="booking-request-card">
                <div className="booking-info">
                  <h4>{booking.studio.name}</h4>
                  <p><strong>Customer:</strong> {booking.customer.name}</p>
                  <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                  <p><strong>Status:</strong> <span className="status">{booking.status}</span></p>
                </div>
                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleConfirmBooking(booking._id)}
                    className="confirm-btn"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
