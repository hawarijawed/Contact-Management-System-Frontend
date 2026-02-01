import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { ContactService } from '../services/contactService';
import Input from '../components/Input';
import Button from '../components/Button';
import Layout from '../layouts/Layout';

const ContactForm = ({ mode = 'add' }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === 'edit' && id) {
            const contact = ContactService.getContact(id);
            if (contact) {
                setFormData(contact);
            } else {
                navigate('/');
            }
        }
    }, [mode, id, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error when user types
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (mode === 'add') {
            ContactService.addContact(formData);
        } else {
            ContactService.updateContact(id, formData);
        }
        navigate('/');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center space-x-4 mb-8">
                    <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {mode === 'add' ? 'Add New Contact' : 'Edit Contact'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <Input
                        id="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="e.g. John Doe"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="john@example.com"
                        />
                        <Input
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <Input
                        id="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, Country"
                    />

                    <div className="pt-4 flex items-center justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex items-center">
                            <Save className="w-4 h-4 mr-2" />
                            {mode === 'add' ? 'Save Contact' : 'Update Contact'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ContactForm;
