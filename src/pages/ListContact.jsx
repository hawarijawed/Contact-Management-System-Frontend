import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { ContactService } from '../services/contactService';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { contactData } from '../assets/contact';
const ListContact = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // Fetch contacts (using ContactService for now)
  const fetchContacts = async () => {
    try {
      //const data = await ContactService.getContacts();
      setContacts(contactData);
    } catch (error) {
      toast.error(`Error fetching contacts: ${error}`);
    }
  };

  // Remove a contact
  const removeContact = async (id) => {
    try {
      //await ContactService.removeContact(id);
      toast.success('Contact removed successfully');
      fetchContacts(); // Refresh list
    } catch (error) {
      toast.error(`Error removing contact: ${error}`);
    }
  };

  useEffect(() => {
    //fetchContacts();
    setContacts(contactData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Contacts</h2>
        <Button onClick={() => navigate('/add-contact')} variant="primary">
          Add Contact
        </Button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 font-semibold">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
        <span>Company</span>
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
              className="grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] gap-2.5 p-3 border-b border-gray-200 text-sm items-center"
            >
              <span>{contact.firstName}</span>
              <span>{contact.lastName}</span>
              <span>{contact.email}</span>
              <span>{contact.company}</span>
              <span
                onClick={() => removeContact(contact.id)}
                className="cursor-pointer text-red-500 hover:text-red-700 text-center"
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
