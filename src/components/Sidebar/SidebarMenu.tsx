// src/components/Sidebar.jsx
import React, { useState } from 'react';
import {
  MdDashboard,
  MdOutlineInsights, // For Analytics
  MdOutlineWorkOutline, // For Job Hiring
  MdOutlineCalendarMonth, // For Schedule Meeting
} from 'react-icons/md'; // Assuming you have react-icons installed
import { FaRobot, FaHandshake, FaFileAlt } from 'react-icons/fa'; // More icons
import ConnectNowCard from './ConnectNowCard';
const SidebarMenu = () => {
  const [activeTab, setActiveTab] = useState('Founder'); // 'Founder' or 'Investor'
  const [activeLink, setActiveLink] = useState('Dashboard'); // Controls active navigation link

  const founderNavItems = [
    { name: 'Dashboard', icon: <MdDashboard size={20} /> },
    { name: 'AI Agent', icon: <FaRobot size={20} /> },
    { name: 'My Matches', icon: <FaHandshake size={20} /> },
    { name: 'Manage Deck', icon: <FaFileAlt size={20} /> },
    { name: 'Schedule Meeting', icon: <MdOutlineCalendarMonth size={20} /> },
    { name: 'Job Hiring', icon: <MdOutlineWorkOutline size={20} /> },
    { name: 'Analytics', icon: <MdOutlineInsights size={20} /> },
  ];

  // You can define investor-specific items if they differ
  const investorNavItems = [
    { name: 'Dashboard', icon: <MdDashboard size={20} /> },
    { name: 'My Investments', icon: <FaHandshake size={20} /> },
    { name: 'Portfolio', icon: <FaFileAlt size={20} /> },
    { name: 'Upcoming Meetings', icon: <MdOutlineCalendarMonth size={20} /> },
    { name: 'Market Insights', icon: <MdOutlineInsights size={20} /> },
  ];

  const navItems = activeTab === 'Founder' ? founderNavItems : investorNavItems;

  return (
    <div className="w-64  text-white h-screen flex flex-col p-4 ml-2 shadow-xl"
     style={{
        borderRight: '1px solid var(--stroke-color)',
        
      }}
    >
      {/* Founder/Investor Toggle */}
      <div className="flex bg-gray-800 rounded-md p-1 mb-8">
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'Founder' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('Founder')}
        >
          Founder
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'Investor' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('Investor')}
        >
          Investor
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#" // In a real app, use React Router Link
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeLink === item.name
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setActiveLink(item.name)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
       
       <ConnectNowCard/>
      {/* Optional: Add a footer or branding here if needed */}
    </div>
  );
};

export default SidebarMenu;