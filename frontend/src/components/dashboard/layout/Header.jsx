// import React from 'react';

// function Header({ toggleDropdown, dropdownOpen, dropdownRef, handleLogout }) {
//   return (
//     <header className="dashboard-header">
//       <h2>Dashboard Admin</h2>
//       <div className="dashboard-dropdown" ref={dropdownRef}>
//         <button onClick={toggleDropdown} className="dashboard-dropdown-btn">
//           <i className="fas fa-user-circle"></i>
//         </button>
//         {dropdownOpen && (
//           <div className="dashboard-dropdown-menu">
//             <button onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;
import React from 'react';

function Header({ toggleDropdown, dropdownOpen, dropdownRef, handleLogout, username }) {
  return (
    <header className="dashboard-header">
      <h2>Dashboard Admin</h2>
      <div className="dashboard-dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="dashboard-dropdown-btn">
          {/* Tampilkan nama user sebelum icon */}
          {username && <span style={{ marginRight: '8px' }}>{username}</span>}
          <i className="fas fa-user-circle"></i>
        </button>
        {dropdownOpen && (
          <div className="dashboard-dropdown-menu">
            <button
              onClick={(e) => {
                e.stopPropagation(); // cegah dropdown tertutup saat klik logout
                handleLogout();
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
