import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="dashboard-sidebar">
      <h4>Menu</h4>
      <ul>
        <li><button onClick={() => navigate('/dashboard')}><i className="fas fa-home"></i> Dashboard</button></li>
        <li><button onClick={() => navigate('/dashboard/mahasiswa')}><i className="fas fa-user-graduate"></i> Mahasiswa</button></li>
        <li><button onClick={() => navigate('/dashboard/user')}><i className="fas fa-users-cog"></i> User</button></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
