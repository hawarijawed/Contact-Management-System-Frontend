import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Mail, Phone, MapPin, User, ArrowLeft } from 'lucide-react';
import { ContactService } from '../services/contactService';
import Button from '../components/Button';

const ContactDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        if (id) {
            const foundContact = ContactService.getContact(id);
            if (foundContact) {
                setContact(foundContact);
            } else {
                // Handle not found
                navigate('/');
            }
        }
    }, [id, navigate]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            ContactService.deleteContact(id);
            navigate('/');
        }
    };

    if (!contact) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    {/* Mobile back button logic could go here if needed, or just relying on sidebar toggle */}
                    <h1 className="text-xl font-bold text-gray-800">Contact Details</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="secondary" onClick={() => navigate(`/edit/${id}`)} className="flex items-center text-sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="danger" onClick={handleDelete} className="flex items-center text-sm bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-12">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-indigo-50 p-8 flex flex-col md:flex-row items-center md:items-start md:space-x-8 space-y-4 md:space-y-0 text-center md:text-left">
                        <div className="w-32 h-32 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-5xl font-bold shadow-inner">
                            {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="pt-2">
                            <h2 className="text-3xl font-bold text-gray-900">{contact.name}</h2>
                            <p className="text-indigo-600 font-medium mt-1">Contact</p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-xs font-medium text-gray-600 border border-indigo-100">
                                    ID: {contact.id}
                                </span>
                                <span className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-xs font-medium text-gray-600 border border-indigo-100">
                                    Added: {new Date(contact.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <div className="flex items-center text-gray-900 text-lg">
                                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                                    {contact.email}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                <div className="flex items-center text-gray-900 text-lg">
                                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                                    {contact.phone}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</label>
                            <div className="flex items-center text-gray-900 text-lg p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                {contact.address || <span className="text-gray-400 italic">No address provided</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;
