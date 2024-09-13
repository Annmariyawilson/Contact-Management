import React, { useState, useEffect } from 'react';
import ContactList from './ContactList'; 
import { fetchContacts, updateContact, deleteContact } from '../Services/AllApis'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure();

function ContactManager() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const data = await fetchContacts();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                toast.error("Failed to fetch contacts.");
            }
        };

        getContacts();
    }, []);

    const handleUpdateContact = async (updatedContact) => {
        try {
            const result = await updateContact(updatedContact.id, updatedContact);
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === updatedContact.id ? result.data : contact
                )
            );
            toast.success("Contact updated successfully!");
        } catch (error) {
            console.error('Error updating contact:', error);
            toast.error("Failed to update contact.");
        }
    };

    const handleDeleteContact = async (contactId) => {
        try {
            await deleteContact(contactId);
            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.id !== contactId)
            );
            toast.success("Contact deleted successfully!");
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error("Failed to delete contact.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Contact Manager</h1>
            <ContactList
                contacts={contacts}
                onDelete={handleDeleteContact}
                onUpdate={handleUpdateContact}
            />
        </div>
    );
}

export default ContactManager;
