// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './login/LoginPage';
// import RegisterPage from './register/RegisterPage';
// import UserPage from './register/UserPage';
// import Home from './components/dashboard/home/Home';
// import DashboardPage from './components/dashboard/home/Home';
// // import Mahasiswa from './dashboard/mahasiswa/MahasiswaPage';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/user" element={<UserPage />} />
//         {/* <Route path="/home" element={<Home />} /> */}
        
//          <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/dashboard" element={<DashboardPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import UserPage from './register/UserPage';

import Home from './components/dashboard/home/Home'; // Layout utama dashboard
import DashboardPage from './dashboard/home/HomePage';
import MahasiswaPage from './dashboard/mahasiswa/MahasiswaPage';
import UserDashboardPage from './dashboard/user/UserPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publik */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />

        {/* Route dashboard dengan layout Home */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Home /> {/* Home adalah layout dengan Header, Sidebar, Footer, Outlet */}
            </ProtectedRoute>
          }
        >
          {/* Nested routes di dalam dashboard */}
          <Route index element={<DashboardPage />} />
          <Route path="mahasiswa" element={<MahasiswaPage />} />
          <Route path="user" element={<UserDashboardPage />} />
          {/* Tambah route lain di sini sesuai kebutuhan */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;