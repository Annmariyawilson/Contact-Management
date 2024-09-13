import React, { useState } from 'react';
import { addContact } from '../Services/AllApis';
import { toast } from 'react-toastify';

function AddContact({ onAddContact }) {
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({ ...prevContact, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await addContact(contact);
            onAddContact(result.data);
            toast.success("Contact added successfully!");
            setContact({ name: '', email: '', phone: '' }); 
        } catch (error) {
            toast.error("Failed to add contact.");
            console.error("Add contact error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="Name"
                className="form-control mb-2"
                required
            />
            <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control mb-2"
                required
            />
            <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="form-control mb-2"
                required
            />
            <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Adding...' : 'Add Contact'}
            </button>
        </form>
    );
}

export default AddContact;
