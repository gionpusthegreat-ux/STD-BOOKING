import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Studio Booking System</h1>
          <p>Book your preferred studio for recording, photography, videography, and more</p>
          <Link to="/studios" className="cta-button">Explore Studios</Link>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <h2>Why Choose Us?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Book studios with just a few clicks. No hassle, no delays.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Real-Time Availability</h3>
              <p>See real-time availability of studios and book your preferred time slots.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Secure and reliable payment processing for your bookings.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Verified Studios</h3>
              <p>All studios are verified and rated by our community.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Book on the go with our mobile-friendly platform.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always ready to help.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Sign Up</h4>
            <p>Create your account as a customer or studio owner</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h4>Browse Studios</h4>
            <p>Search and filter studios based on your needs</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h4>Make Booking</h4>
            <p>Select time slot and confirm your booking</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h4>Enjoy Service</h4>
            <p>Visit the studio and enjoy your booked time</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of studios and customers using our platform</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-btn customer">Sign Up as Customer</Link>
          <Link to="/register" className="cta-btn owner">Become a Studio Owner</Link>
        </div>
      </div>
    </div>
  );
}
