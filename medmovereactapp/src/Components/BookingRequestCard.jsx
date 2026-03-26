import React from 'react';
import './BookingRequestCard.css';

const BookingRequestCard = ({ booking, onAccept, onReject }) => {
  return (
    <div className="booking-card">
      <div className="booking-header">
        <div className="request-tag">🔔 NEW REQUEST</div>
        <div className="booking-id">#BK{String(booking.id).padStart(3, '0')}</div>
      </div>

      <div className="booking-body">
        <div className="patient-info">
          <strong>👤 Patient:</strong> {booking.User?.full_name || booking.patient_name}
        </div>
        <div className="location-info">
          <strong>📍 Route:</strong> {booking.pickup_location} → {booking.drop_location}
        </div>
        <div className="time-info">
          <strong>📅 Date:</strong> {booking.booking_date}  <strong>🕐 Time:</strong> {booking.booking_time}
        </div>
        <div className="vehicle-info">
          <strong>🚑 Vehicle:</strong> {booking.Ambulance?.vehicle_number} ({booking.Ambulance?.type})
        </div>
        <div className="amount-info">
          <strong>💰 Amount:</strong> ₹{booking.amount}
        </div>
        <div className="contact-info">
          <strong>📞 Contact:</strong> {booking.User?.phone || booking.contact_number}
        </div>
      </div>

      {booking.status === 'pending' && (
        <div className="booking-actions">
          <button className="accept-btn" onClick={() => onAccept(booking.id)}>✅ Accept Booking</button>
          <button className="reject-btn" onClick={() => onReject(booking.id)}>❌ Reject</button>
        </div>
      )}
      
      {booking.status !== 'pending' && (
        <div className={`booking-status-footer ${booking.status}`}>
          Status: {booking.status.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default BookingRequestCard;
