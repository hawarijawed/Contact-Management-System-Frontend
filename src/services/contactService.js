import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ContactService = {
    // Get all contacts
    getAll: () => api.get('/contact/get'),

    // Add new contact
    addContact: async (data) => {
        try {
            const res = await api.post('/contact/add', data);
            console.log('Contact added:', res.data);
            return res.data;
        } catch (error) {
            console.error('Error adding contact:', error);
            throw error;
        }
    },

    // Delete contact
    remove: (id) => api.delete(`/contact/delete/${id}`),

    // Search contacts
    search: async (query) => {
        try {
            const res = await api.post('/contact/search', query);
            console.log('Search results:', res.data);
            return res.data;
        }
        catch (error) {
            console.error('Error searching contacts:', error);
            throw error;
        }
    },

    // (Optional) Get by id
    getById: (id) => api.get(`/contact/${id}`),

    // (Optional) Update
    update: (id, data) => api.put(`/contact/${id}`, data),
};

export default ContactService;