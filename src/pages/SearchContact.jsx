import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ContactService from '../services/contactService';
import Button from '../components/Button';

const SearchContact = () => {
  const [searchParams, setSearchParams] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    company: '',
    tags: ''
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      // Convert tags string to array if present
      const payload = { ...searchParams };
      if (payload.tags) {
        payload.tags = payload.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      }
      else{
        payload.tags = [];
      }
      //console.log('Search payload:', payload);
      const data = await ContactService.search(payload);
      //console.log('Search response data:', data);
      setResults(data);
      if (data.length === 0) toast.info('No contacts found');
    } catch (error) {
      console.error(error);
      toast.error('Failed to search contacts');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8 text-black">
      <h2 className="text-2xl font-bold mb-6">Search Contacts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {['firstName','lastName','email','contact','company','tags'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1">
              {field === 'tags' ? 'Tags (comma separated)' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={searchParams[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <Button onClick={handleSearch} variant="primary">
          Search
        </Button>
      </div>

      {/* Results */}
      <div className='mb-10'>
        {results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">First Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Last Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Contact</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Company</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-4 py-2">{contact.firstName}</td>
                    <td className="px-4 py-2">{contact.lastName}</td>
                    <td className="px-4 py-2">{contact.email}</td>
                    <td className="px-4 py-2">{contact.contact}</td>
                    <td className="px-4 py-2">{contact.company}</td>
                    <td className="px-4 py-2">
                      {contact.tags && contact.tags.length > 0 ? contact.tags.join(', ') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContact;
