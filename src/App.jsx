import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddContact from './pages/AddContact';
import ListContact from './pages/ListContact';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchContact from './pages/SearchContact';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar for mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
      <div className="flex min-h-screen bg-[#f3fff7]">
        {/* Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen sm:ml-0 ">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Page content */}
          <div className="flex-1 p-5 sm:p-8 overflow-y-auto">
            <Routes>
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/list-contact" element={<ListContact />} />
              <Route path="/update-contact" element={<AddContact />} /> {/* Example */}
              <Route path='/search-contact' element={<SearchContact />} />
            </Routes>
          </div>
        </div>

        {/* Toast container */}
        <ToastContainer />
      </div>
  );
}

export default App;
