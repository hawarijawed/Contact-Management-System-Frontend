import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './layouts/Layout';
import AddContact from './pages/AddContact';
import './index.css';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import ListContact from './pages/ListContact';
import { ToastContainer, toast } from 'react-toastify';

// Wrapper to apply Layout to all child routes
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <SideBar />

      <div className='flex-1 h-screen overflow-y-scroll bg-[#f3fff7]'>
        <Navbar />
        <div className='pt-8 pl-5 sm:pl-12'>
          <Routes>
            <Route path='/add-contact' element={<AddContact/>} />
            <Route path='/list-contact' element={<ListContact/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
