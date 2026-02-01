import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, User } from 'lucide-react';
import { ContactService } from '../services/contactService';
import Button from './Button';

const ContactSidebar = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Load contacts on mount and when location changes (in case of add/delete)
    useEffect(() => {
        setContacts(ContactService.getContacts());
    }, [location.pathname]); // Simple way to refresh list when routes change

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
            {/* Header / Search */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Contacts</h2>
                    <Button
                        onClick={() => navigate('/add')}
                        className="p-2 h-8 w-8 rounded-full flex items-center justify-center !px-0"
                        variant="primary"
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
                {filteredContacts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No contacts found.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredContacts.map(contact => {
                            // Check if this contact is currently selected (active route)
                            // This is a rough check, ideally we parse parameters
                            const isActive = location.pathname.includes(`/contact/${contact.id}`) || location.pathname.includes(`/edit/${contact.id}`);

                            return (
                                <div
                                    key={contact.id}
                                    onClick={() => navigate(`/contact/${contact.id}`)}
                                    className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'bg-indigo-50 hover:bg-indigo-50 border-l-4 border-indigo-600' : 'border-l-4 border-transparent'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${isActive ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className={`text-sm font-medium truncate ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                                            {contact.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactSidebar;
