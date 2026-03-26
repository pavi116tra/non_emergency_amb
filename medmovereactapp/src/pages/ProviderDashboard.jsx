import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardStats from '../Components/DashboardStats';
import AmbulanceListCard from '../Components/AmbulanceListCard';
import BookingRequestCard from '../Components/BookingRequestCard';
import './ProviderDashboard.css';

const ProviderDashboard = () => {
  const { provider, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('ambulances');
  const [stats, setStats] = useState({});
  const [ambulances, setAmbulances] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const statsRes = await fetch('http://localhost:5000/api/provider/dashboard-stats', { headers });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      const ambRes = await fetch('http://localhost:5000/api/provider/ambulances', { headers });
      const ambData = await ambRes.json();
      if (ambData.success) setAmbulances(ambData.ambulances);

      const bookRes = await fetch('http://localhost:5000/api/provider/bookings?status=pending', { headers });
      const bookData = await bookRes.json();
      if (bookData.success) setBookings(bookData.bookings);

      setLoading(false);
    } catch (err) {
      console.error('Fetch Dashboard Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login/provider');
    } else {
      fetchData();
    }
  }, [token]);

  const handleAcceptBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/provider/bookings/${id}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error('Accept Booking Error:', err);
    }
  };

  const handleRejectBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/provider/bookings/${id}/reject`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error('Reject Booking Error:', err);
    }
  };

  const handleDeleteAmbulance = async (id) => {
    if (!window.confirm('Are you sure you want to remove this ambulance?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/provider/ambulances/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error('Delete Ambulance Error:', err);
    }
  };

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav">
        <div className="nav-logo">🚑 MedMove</div>
        <div className="nav-user">
          <span>Welcome, <strong>{provider?.company_name || 'Provider'}</strong></span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <DashboardStats stats={stats} />

        <div className="tab-menu">
          <button 
            className={activeTab === 'ambulances' ? 'active' : ''} 
            onClick={() => setActiveTab('ambulances')}
          >
            My Ambulances
          </button>
          <button 
            className={activeTab === 'bookings' ? 'active' : ''} 
            onClick={() => setActiveTab('bookings')}
          >
            Booking Requests {bookings.length > 0 && <span className="badge">{bookings.length}</span>}
          </button>
          <button 
            className={activeTab === 'earnings' ? 'active' : ''} 
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'ambulances' && (
            <div className="fleet-section">
              <div className="section-header">
                <h2>My Ambulances</h2>
                <button 
                  className="add-btn" 
                  onClick={() => navigate('/provider/add-ambulance')}
                >
                  + Add Ambulance
                </button>
              </div>
              <div className="ambulance-grid">
                {ambulances.map(amb => (
                  <AmbulanceListCard 
                    key={amb.id} 
                    ambulance={amb} 
                    onEdit={(a) => navigate(`/provider/edit-ambulance/${a.id}`)}
                    onDelete={handleDeleteAmbulance}
                  />
                ))}
                {ambulances.length === 0 && <p className="empty">No ambulances added yet.</p>}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>Recent Booking Requests</h2>
              <div className="booking-list">
                {bookings.map(book => (
                  <BookingRequestCard 
                    key={book.id} 
                    booking={book} 
                    onAccept={handleAcceptBooking}
                    onReject={handleRejectBooking}
                  />
                ))}
                {bookings.length === 0 && <p className="empty">No pending requests.</p>}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="earnings-section">
              <h2>Earnings Overview</h2>
              <div className="earnings-card">
                <h3>Total Revenue</h3>
                <p className="amount">₹{stats.total_earnings || 0}</p>
                <div className="earnings-details">
                  <p>Payouts are processed every Monday.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
