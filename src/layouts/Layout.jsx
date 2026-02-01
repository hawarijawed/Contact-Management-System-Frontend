import React, { useState } from 'react';
import ContactSidebar from '../components/ContactSidebar';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Sidebar Toggle - Visible only on small screens when sidebar is hidden */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-600"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Sidebar Panel */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-gray-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <ContactSidebar />
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto h-full w-full bg-gray-50 relative">
                {children}
            </main>
        </div>
    );
};

export default Layout;
