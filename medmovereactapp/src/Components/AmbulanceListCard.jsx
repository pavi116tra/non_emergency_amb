import React from 'react';
import './AmbulanceListCard.css';

const AmbulanceListCard = ({ ambulance, onEdit, onDelete }) => {
  return (
    <div className="ambulance-card">
      <div className="card-header">
        <div className="vehicle-info">
          <span className="icon">🚑</span>
          <h4>{ambulance.vehicle_number}</h4>
        </div>
        <span className={`status-badge ${ambulance.status}`}>
          {ambulance.status === 'available' ? '✅ Available' : 
           ambulance.status === 'booked' ? '🟡 Booked' :
           ambulance.status === 'on_trip' ? '🔵 On Trip' : '🔴 Maintenance'}
        </span>
      </div>
      
      <div className="card-details">
        <div className="detail-item">
          <strong>Type:</strong> {ambulance.type.toUpperCase()}
        </div>
        <div className="detail-item">
          <strong>Driver:</strong> {ambulance.driver_name} 📞 {ambulance.driver_phone}
        </div>
        <div className="detail-item">
          <strong>Base:</strong> {ambulance.base_location}
        </div>
        <div className="detail-item price">
          <strong>Charge:</strong> ₹{ambulance.base_charge} + ₹{ambulance.price_per_km}/km
        </div>
      </div>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(ambulance)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(ambulance.id)}>Delete</button>
      </div>
    </div>
  );
};

export default AmbulanceListCard;
