import React from 'react';
import { User, Phone, Mail, MapPin, Edit2, Trash2 } from 'lucide-react';
import Button from './Button';

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-500">Added on {new Date(contact.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-sm truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-sm">{contact.phone}</span>
                    </div>
                    {contact.address && (
                        <div className="flex items-start text-gray-600">
                            <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1" />
                            <span className="text-sm line-clamp-2">{contact.address}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex space-x-2 border-t pt-4 border-gray-100">
                <Button variant="secondary" className="flex-1 flex items-center justify-center text-sm py-1.5" onClick={() => onEdit(contact)}>
                    <Edit2 className="w-3.5 h-3.5 mr-2" />
                    Edit
                </Button>
                <Button variant="danger" className="flex-1 flex items-center justify-center text-sm py-1.5 bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700" onClick={() => onDelete(contact.id)}>
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ContactCard;
