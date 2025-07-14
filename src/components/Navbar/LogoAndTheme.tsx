import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { RiFlipHorizontalFill } from "react-icons/ri";

const LogoAndTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') || systemTheme;
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div
      className="flex items-center justify-between h-16  w-64 border-r border-b"
      style={{
        borderRight: '1px solid var(--stroke-color)',
        borderBottom: '1px solid var(--stroke-color)',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-10 w-auto object-contain"
        style={{ maxWidth: '160px' }} // Optional control
      />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 "
        title="Toggle Theme"
      >
        <RiFlipHorizontalFill className="text-2xl text-white dark:text-white" />
      </button>
    </div>
  );
};

export default LogoAndTheme;
