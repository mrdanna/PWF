import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios';
import '../../../assets/css/dashboard.css';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Klik logout'); // debug
    try {
      await api.post('/api/logout');
      if (onLogout) onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '200px', background: '#333', color: '#fff', padding: '20px' }}>
        <h3>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px' }}>
        <h1>Selamat datang di Dashboard</h1>
        <p>Silakan pilih menu di samping.</p>
      </main>
    </div>
  );
}

export default Dashboard;
