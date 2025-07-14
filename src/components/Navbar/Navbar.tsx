// src/components/Navbar.jsx
import {
 
  RiSettings3Line,
  RiQuestionLine,
} from 'react-icons/ri';

import { HiOutlineBellAlert } from "react-icons/hi2";
import profilePic from '../../assets/profilePic.png';
import LogoAndTheme from './LogoAndTheme';

export default function Navbar({ onToggleTheme }) {
  return (
    <header
  className="fixed top-0 left-0 right-0 h-16 border-b flex items-center justify-between px-4 z-10"
  style={{
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    borderColor: 'var(--stroke-color)',
  }}
>
      {/* Left: Logo and Theme Toggle */}
      <div className="flex items-center gap-4">
        <LogoAndTheme />
      </div>
          
        {/* Profile */}
        <div className="flex items-center gap-2 pl-4">
          <img
            src={profilePic}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover border dark:border-[#303030]"
          />
          <span className="text-sm font-medium hidden sm:inline">Tobi Mathew</span>
        </div>

      {/* Center: Search Bar */}
       <div className="flex items-center gap-4 ml-auto">
        {/* Search Bar (moved to right) */}
       <input
  type="text"
  placeholder="Search..."
  className="px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  style={{
    width: '192px', // same as w-48
    backgroundColor: 'var(--background-color)',
    color: 'var(--subtext-color)',
    border: '1px solid var(--stroke-color)',
    borderRadius: '12px',
    padding: '8px 12px',
    fontSize: '0.875rem', // text-sm
    outline: 'none',
  }}
/>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <HiOutlineBellAlert 
          className="text-2xl cursor-pointer hover:text-blue-500 p-1"
          style={{
    border: '1px solid var(--stroke-color)',
    borderRadius: '8px',
    // height: '40px',
    // width: '40px',
    color: 'var(--text-color)',
  }}
          title="Notifications"
        />
        <RiSettings3Line
          className="text-2xl cursor-pointer hover:text-blue-500 p-1"
          style={{
    border: '1px solid var(--stroke-color)',
    borderRadius: '8px',
    // height: '40px',
    // width: '40px',
    color: 'var(--text-color)',
  }}
          title="Settings"
        />
        <RiQuestionLine
          className="text-2xl cursor-pointer hover:text-blue-500 p-1"
  style={{
    border: '1px solid var(--stroke-color)',
    borderRadius: '8px',
    // height: '40px',
    // width: '40px',
    color: 'var(--text-color)',
  }}
         title="Help"
        />

       </div>
      </div>
    </header>
  );
}
