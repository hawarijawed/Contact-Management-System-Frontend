import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ContactService } from '../services/contactService';
import Button from '../components/Button.jsx';

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
        setFormData(prev => ({ ...prev, [name]: value }));
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

        // Convert tags string to array, split by comma
        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        try {
            await ContactService.addContact({ ...formData, tags: tagsArray });
            navigate('/'); // Redirect back to contact list
        } catch (err) {
            console.error('Error adding contact:', err);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8 text-black">
            <h2 className="text-2xl font-bold mb-6">Add Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Contact */}
                <div>
                    <label className="block text-sm font-medium mb-1">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                </div>

                {/* Company */}
                <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Submit Button */}
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
