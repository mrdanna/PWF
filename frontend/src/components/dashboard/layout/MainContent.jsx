// import React from 'react';
// import { Outlet } from 'react-router-dom';

// function MainContent() {
//   return (
//     <main className="dashboard-main">
//       <Outlet />
//     </main>
//   );
// }

// export default MainContent;

import React from 'react';
import { Outlet } from 'react-router-dom';

function MainContent() {
  return <main className="dashboard-main"><Outlet /></main>;
}

export default MainContent;
