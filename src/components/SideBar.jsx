import React from 'react';
import { NavLink } from 'react-router-dom';
import { EyeIcon, PlusCircleIcon, PencilIcon, SearchIcon } from 'lucide-react';

const SideBar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          bg-[#e1dfed] min-h-screen fixed z-20 top-0 left-0 
          w-64 p-5 pt-8 flex flex-col gap-5
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 sm:relative sm:w-64
        `}
      >
        {/* Logo */}
        <img
          className='mt-5 w-[max(10vw,100px)] hidden sm:block'
          src="/"
          alt='logo image'
        />
        <img
          className='mt-5 w-[max(5vw, 40px)] sm:hidden block mb-5'
          src="{assets.logo_small}"
          alt='Small logo image'
        />

        {/* Navigation Links */}
        <div className='flex flex-col gap-5 mt-10'>
          {/* Add Contact */}
          <NavLink
            to='/add-contact'
            className='flex items-center justify-between gap-2.5 text-white bg-[#4611d8] border border-gray-300 p-2 cursor-pointer text-sm font-medium rounded-lg hover:bg-[#3509a0] transition-colors'
            onClick={toggleSidebar} // Close sidebar on mobile
          >
            <p className='p-3 hidden sm:block'>Add Contact</p>
            <PlusCircleIcon className='w-5 h-5' />
          </NavLink>

          {/* List Contact */}
          <NavLink
            to='/list-contact'
            className='flex items-center justify-between gap-2.5 text-white bg-[#4611d8] border border-gray-300 p-2 cursor-pointer text-sm font-medium rounded-lg hover:bg-[#3509a0] transition-colors'
            onClick={toggleSidebar}
          >
            <p className='hidden sm:block p-3'>List Contact</p>
            <EyeIcon className='w-5 h-5' />
          </NavLink>

          {/* Update Contact */}
          <NavLink
            to='/update-contact'
            className='flex items-center justify-between gap-2.5 text-white bg-[#4611d8] border border-gray-300 p-2 cursor-pointer text-sm font-medium rounded-lg hover:bg-[#3509a0] transition-colors'
            onClick={toggleSidebar}
          >
            <p className='hidden sm:block p-3'>Update Contact</p>
            <PencilIcon className='w-5 h-5' />
          </NavLink>

          {/* Update Contact */}
          <NavLink
            to='/search-contact'
            className='flex items-center justify-between gap-2.5 text-white bg-[#4611d8] border border-gray-300 p-2 cursor-pointer text-sm font-medium rounded-lg hover:bg-[#3509a0] transition-colors'
            onClick={toggleSidebar}
          >
            <p className='hidden sm:block p-3'>Search Contact</p>
            <SearchIcon className='w-5 h-5' />
          </NavLink>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-10 sm:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;
