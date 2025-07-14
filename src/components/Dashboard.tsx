import React from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/SidebarMenu';
import Sections from './Sections/index';

interface DashboardProps {
  userData: any; //  replace 'any' with the actual shape of your user data
}
const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  console.log('User data in Dashboard:', userData);


  return (
    <div>
        <Navbar/>
       
        <div className="grid grid-cols-1 lg:grid-cols-[16rem_2fr_1fr] pt-16 p-2 min-h-screen">
  {/* Sidebar */}
  <aside className="hidden lg:block">
    <Sidebar />
  </aside>

  {/* Profile Section */}
 <Sections/>
</div>
    </div>
  )
}


export default Dashboard;