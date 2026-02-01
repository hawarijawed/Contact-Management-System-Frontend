import React from 'react';
import { MenuIcon } from 'lucide-react'; // Hamburger icon from lucid-react

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-5 sm:px-12 py-4 flex items-center justify-between">
      
      {/* Left Side: Hamburger (mobile) + Title */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu: visible on mobile */}
        <button
          className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
          onClick={toggleSidebar}
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        <p className="text-xl font-semibold text-green-900">Admin Panel</p>
      </div>

      {/* Right Side: User & Notifications */}
      <div className="flex items-center gap-4">
        {/* User Icon */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold cursor-pointer">
          A
        </div>

        {/* Notifications */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold cursor-pointer">
          🔔
        </div>
      </div>
    </div>
  );
};

export default Navbar;
