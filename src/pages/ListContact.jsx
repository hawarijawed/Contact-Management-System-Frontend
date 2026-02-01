import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { contactData } from '../assets/contact';
import ContactService from '../services/contactService';
const ListContact = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    // Fetch contacts
    const fetchContacts = async () => {
        try {
            const res = await ContactService.getAll();
            console.log(res);
            setContacts(res.data);
        } catch (error) {
            toast.error(`Error fetching contacts: ${error}`);
        }
    };

    // Remove a contact
    const removeContact = async (id) => {
        try {
            await ContactService.remove(id);
            toast.success('Contact removed successfully');
            fetchContacts(); // Refresh list
        } catch (error) {
            toast.error(`Error removing contact: ${error}`);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-md mt-8 text-black">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">All Contacts</h2>
                <Button onClick={() => navigate('/add-contact')} variant="primary">
                    Add Contact
                </Button>
            </div>

            {/* Table Header (hidden on mobile, shown on sm+) */}
            <div className="hidden sm:grid grid-cols-[0.5fr_0.5fr_1fr_1fr_1fr_0.5fr] gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 font-semibold">
                <span>First Name</span>
                <span>Last Name</span>
                <span>Email</span>
                <span>Company</span>
                <span>Tag</span>
                <span>Action</span>
            </div>

            {/* Contact List */}
            <div className="divide-y divide-gray-200">
                {contacts.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No contacts found.</div>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="grid sm:grid-cols-[0.5fr_0.5fr_1fr_1fr_1fr_0.5fr] gap-2.5 p-3 border-b border-gray-200 text-sm items-center"
                        >
                            {/* Mobile Layout: stacked */}
                            <div className="sm:hidden flex flex-col gap-1">
                                <div>
                                    <span className="font-semibold">Name: </span>
                                    {contact.firstName} {contact.lastName}
                                </div>
                                <div>
                                    <span className="font-semibold">Email: </span>
                                    {contact.email}
                                </div>
                                <div>
                                    <span className="font-semibold">Company: </span>
                                    {contact.company}
                                </div>
                                <div>
                                    <span className="font-semibold">Tag: </span>
                                    console.log(contact.tags);
                                    {contact.tags && contact.tags.length > 0 ? contact.tags.join(', ') : '-'}
                                </div>
                                <div
                                    onClick={() => removeContact(contact.id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer mt-2"
                                >
                                    Remove
                                </div>
                            </div>

                            {/* Desktop Layout: grid */}
                            <span className="hidden sm:block">{contact.firstName}</span>
                            <span className="hidden sm:block">{contact.lastName}</span>
                            <span className="hidden sm:block">{contact.email}</span>
                            <span className="hidden sm:block">{contact.company}</span>
                            <span className="hidden sm:block">{contact.tags && contact.tags.length > 0 ? contact.tags.join(', ') : '-'}</span>
                            <span
                                onClick={() => removeContact(contact.id)}
                                className="hidden sm:block cursor-pointer text-red-500 hover:text-red-700 text-center"
                            >
                                X
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListContact;
