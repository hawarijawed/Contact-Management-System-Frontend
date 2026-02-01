import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactService from '../services/contactService';
import Button from '../components/Button.jsx';
import { toast } from 'react-toastify';

const AddContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    company: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    
    const payload = { ...formData, tags: tagsArray };
    try {
      // await ContactService.addContact({ ...formData, tags: tagsArray });
      await ContactService.addContact(payload);
      toast.success('Contact added successfully');
      navigate('/list-contact'); // Redirect back to contact list
    } catch (err) {
      console.error('Error adding contact:', err);
      toast.error('Failed to add contact');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8 text-black">
            <h2 className="text-2xl font-bold mb-6">Add Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['firstName', 'lastName', 'email', 'contact', 'company', 'tags'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium mb-1">
                            {field === 'tags' ? 'Tags (comma separated)' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                    </div>
                ))}
                <div className="pt-4">
                    <Button type="submit" variant="primary" className="w-full">
                        Add Contact
                    </Button>
                </div>
            </form>
        </div>
  );
};

export default AddContact;
