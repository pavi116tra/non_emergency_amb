import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4 className="footer-title">MEDMOVE</h4>
          <p className="footer-text">
            India's No.1 Online Non-emergency Ambulance Booking App. Providing seamless, safe, and smart transport solutions.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">CONTACT US</h4>
          <p className="footer-list">
            <strong>Phone:</strong> +91 98765 43210<br />
            <strong>Email:</strong> support@medmove.in<br />
            <strong>Address:</strong> 123 Healthcare Plaza, Madurai, Tamil Nadu
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">AVAILABLE IN</h4>
          <p className="footer-list">
            Lucknow | Agra | Ayodhya | Varanasi | Sivakasi | Madurai | Delhi |
            Chennai | Coimbatore | Trichy | Erode | Salem
          </p>
        </div>
      </div>

      <hr />

      <div className="footer-section">
        <h4 className="footer-title">BOOK AMBULANCE</h4>
        <p className="footer-list">
          Patient Transfer | Basic Life Support (BLS) | Advanced Life Support
          (ALS) | Dead Body Transfer | Train Ambulance | Veterinary Ambulance |
          Pet Transfer
        </p>
      </div>

      <hr />

      <div className="footer-links-container">
        <div className="footer-about">
          <h4 className="footer-title">About Our Service</h4>
          <p>
            Book non-emergency ambulances for patients or pets with ease. Enter context, compare rates, and track your ride in real-time.
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 MedMove Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
