import React from 'react';
import { NavLink } from 'react-router-dom';
import { contactData } from '../assets/contact.js';
const SideBar = () => {
  return (
    <div className='bg-[#003a10] min-h-screen pl-[4vw]'>
      {/* Logo */}
      <img
        className='mt-5 w-[max(10vw,100px)] hidden sm:block'
        src="/"
        alt='logo image'
      />
      <img
        className='mt-5 w-[max(5vw, 40px)] mr-5 sm:hidden block'
        src="{assets.logo_small}"
        alt='Small logo image'
      />

      {/* Navigation Links */}
      <div className='flex flex-col gap-5 mt-10'>
        {/* Add Contact */}
        <NavLink
          to='/add-contact'
          className='flex items-center gap-2.5 text-gray-800 bg-white border border-gray-300 p-2 pr-[max(8vw,10px)] cursor-pointer text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors'
        >
          <img className='w-5' src="/" alt='Add Contact' />
          <p className='hidden sm:block'>Add Contact</p>
        </NavLink>

        {/* List Contact */}
        <NavLink
          to='/list-contact'
          className='flex items-center gap-2.5 text-gray-800 bg-white border border-gray-300 p-2 pr-[max(8vw,10px)] cursor-pointer text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors'
        >
          <img className='w-5' src="/" alt='List Contact' />
          <p className='hidden sm:block'>List Contact</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
