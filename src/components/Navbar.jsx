import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-5 sm:px-12 py-4 flex items-center justify-between">
      {/* Left Side: Title */}
      <p className="text-xl font-semibold text-green-900">Admin Panel</p>

      {/* Right Side: Placeholder for actions (optional) */}
      <div className="flex items-center gap-4">
        {/* Example: User Icon */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold cursor-pointer">
          A
        </div>
        {/* Example: Notifications */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold cursor-pointer">
          🔔
        </div>
      </div>
    </div>
  );
};

export default Navbar;
