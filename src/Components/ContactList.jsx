import React, { useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import EditContact from './EditContact';

function ContactList({ contacts, onDelete, onUpdate }) {
    const [editingContactId, setEditingContactId] = useState(null);

    const handleEditClick = (contact) => {
        setEditingContactId(contact.id);
    };

    const handleCancelEdit = () => {
        setEditingContactId(null);
    };

    return (
        <Container fluid>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                {editingContactId === contact.id ? (
                                    <td colSpan="4">
                                        <EditContact
                                            contact={contact}
                                            onCancel={handleCancelEdit}
                                            onUpdate={onUpdate}
                                        />
                                    </td>
                                ) : (
                                    <>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleEditClick(contact)}
                                            >
                                                Edit
                                            </Button>{' '}
                                            <Button
                                                variant="danger"
                                                onClick={() => onDelete(contact.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default ContactList;
