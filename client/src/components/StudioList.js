import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studioAPI } from '../services/api';
import './StudioList.css';

export default function StudioList() {
  const [studios, setStudios] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    studioType: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    try {
      setLoading(true);
      const response = await studioAPI.getAll(filters);
      setStudios(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load studios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudios();
  };

  const studioTypes = ['recording', 'photography', 'videography', 'rehearsal', 'multi-purpose'];

  return (
    <div className="studio-list-container">
      <div className="filter-section">
        <h2>Find Studios</h2>
        <form onSubmit={handleSearch} className="filter-form">
          <div className="filter-group">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <select
              name="studioType"
              value={filters.studioType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Studio Types</option>
              {studioTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {loading && <div className="loading">Loading studios...</div>}
      {error && <div className="error">{error}</div>}

      <div className="studios-grid">
        {studios.map(studio => (
          <div key={studio._id} className="studio-card">
            <div className="studio-image">
              {studio.images?.[0] ? (
                <img src={studio.images[0]} alt={studio.name} />
              ) : (
                <div className="placeholder-image">📷</div>
              )}
            </div>
            <div className="studio-info">
              <h3>{studio.name}</h3>
              <p className="studio-type">
                {studio.studioType.charAt(0).toUpperCase() + studio.studioType.slice(1)}
              </p>
              <p className="studio-location">📍 {studio.location.city}</p>
              <p className="studio-price">₨{studio.hourlyRate}/hour</p>
              <p className="studio-rating">⭐ {studio.rating.toFixed(1)}</p>
              <Link to={`/studios/${studio._id}`} className="view-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!loading && studios.length === 0 && (
        <div className="no-results">No studios found. Try adjusting your filters.</div>
      )}
    </div>
  );
}
