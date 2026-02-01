
const STORAGE_KEY = 'cms_contacts';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const ContactService = {
  getContacts: () => {
    const contacts = localStorage.getItem(STORAGE_KEY);
    return contacts ? JSON.parse(contacts) : [];
  },

  getContact: (id) => {
    const contacts = ContactService.getContacts();
    return contacts.find(c => c.id === id);
  },

  addContact: (contact) => {
    const contacts = ContactService.getContacts();
    const newContact = { ...contact, id: generateId(), createdAt: new Date().toISOString() };
    contacts.push(newContact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return newContact;
  },

  updateContact: (id, updatedContact) => {
    const contacts = ContactService.getContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedContact };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      return contacts[index];
    }
    return null;
  },

  deleteContact: (id) => {
    const contacts = ContactService.getContacts();
    const newContacts = contacts.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
  }
};
