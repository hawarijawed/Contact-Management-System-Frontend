import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { ContactService } from '../services/contactService';
import ContactCard from '../components/ContactCard';
import Button from '../components/Button';
import Layout from '../layouts/Layout';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        setContacts(ContactService.getContacts());
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            ContactService.deleteContact(id);
            loadContacts();
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contacts</h1>
                    <p className="text-gray-500 mt-1">Manage all your contacts in one place</p>
                </div>
                <Button onClick={() => navigate('/add')} className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Contact
                </Button>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search contacts by name or email..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredContacts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <Search className="w-12 h-12" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {contacts.length === 0 ? "Get started by creating a new contact." : "Try adjusting your search terms."}
                    </p>
                    {contacts.length === 0 && (
                        <div className="mt-6">
                            <Button onClick={() => navigate('/add')}>Create Contact</Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContacts.map(contact => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onEdit={(c) => navigate(`/edit/${c.id}`)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default ContactList;
