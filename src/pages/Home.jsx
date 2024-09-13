import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getContacts, deleteContact } from '../Services/AllApis';
import AddContact from '../Components/AddContact';
import ContactList from '../Components/ContactList';

function Home() {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const result = await getContacts();
            setContacts(result.data);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
            toast.error("Failed to fetch contacts.");
        }
    };

    const handleAddContact = (newContact) => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
            toast.success("Contact deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete contact.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Contact List</h2>
            <AddContact onAddContact={handleAddContact} />
            <ContactList contacts={contacts} onDelete={handleDelete} />
        </div>
    );
}

export default Home;
