import React, { useState } from 'react';
import { Table, Button, Container, Badge, Card } from 'react-bootstrap';
import EditContact from './EditContact';

function ContactList({ contacts, onDelete, onUpdate }) {
    const [editingContactId, setEditingContactId] = useState(null);

    const handleEditClick = (contact) => {
        setEditingContactId(contact.id);
    };

    const handleCancelEdit = () => {
        setEditingContactId(null);
    };

    const handleUpdateContact = (updated) => {
        if (!updated || !updated.id) {
            console.error("Invalid contact returned:", updated);
            return;
        }
        onUpdate(updated);
        setEditingContactId(null);
    };

    return (
        <Container className="my-3 my-md-5 px-0 px-sm-3" fluid="md">
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center p-3 p-sm-4 pb-2 pb-sm-3">
                        <div className="mb-2 mb-sm-0">
                            <h5 className="m-0 fw-semibold" style={{ color: '#1a1a1a' }}>Contacts</h5>
                            <p className="m-0 text-muted small">Manage your contact directory</p>
                        </div>
                        <Badge pill className="px-3 py-2" style={{ 
                            backgroundColor: '#f0f7ff', 
                            color: 'white',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                        }}>
                            {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
                        </Badge>
                    </div>

                    <div className="table-responsive">
                        <Table hover className="m-0 align-middle d-none d-sm-table">
                            <thead style={{ 
                                backgroundColor: '#fafafa',
                                borderTop: '1px solid #f0f0f0'
                            }}>
                                <tr>
                                    <th className="py-3 ps-4 text-uppercase small text-muted fw-semibold">Name</th>
                                    <th className="py-3 text-uppercase small text-muted fw-semibold">Email</th>
                                    <th className="py-3 text-uppercase small text-muted fw-semibold">Phone</th>
                                    <th className="py-3 pe-4 text-end text-uppercase small text-muted fw-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact.id} style={{ 
                                        borderBottom: '1px solid #f5f5f5',
                                        backgroundColor: editingContactId === contact.id ? '#fafafa' : '#ffffff'
                                    }}>
                                        {editingContactId === contact.id ? (
                                            <td colSpan="4" className="p-0">
                                                <EditContact
                                                    contact={contact}
                                                    onCancel={handleCancelEdit}
                                                    onUpdate={handleUpdateContact}
                                                />
                                            </td>
                                        ) : (
                                            <>
                                                <td className="py-3 ps-4" style={{ color: '#333333', fontWeight: '500' }}>
                                                    {contact.name}
                                                </td>
                                                <td className="py-3" style={{ color: '#666666' }}>
                                                    {contact.email}
                                                </td>
                                                <td className="py-3" style={{ color: '#666666' }}>
                                                    {contact.phone}
                                                </td>
                                                <td className="py-3 pe-4 text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            className="px-3 rounded-1 border-0"
                                                            style={{
                                                                backgroundColor: '#f0f7ff',
                                                                color: '#0066ff',
                                                                fontWeight: '500'
                                                            }}
                                                            onClick={() => handleEditClick(contact)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            className="px-3 rounded-1 border-0"
                                                            style={{
                                                                backgroundColor: '#fff0f0',
                                                                color: '#ff3333',
                                                                fontWeight: '500'
                                                            }}
                                                            onClick={() => onDelete(contact.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Mobile View - Cards */}
                        <div className="d-sm-none">
                            {contacts.map((contact) => (
                                editingContactId === contact.id ? (
                                    <div key={contact.id} className="p-0">
                                        <EditContact
                                            contact={contact}
                                            onCancel={handleCancelEdit}
                                            onUpdate={handleUpdateContact}
                                        />
                                    </div>
                                ) : (
                                    <Card key={contact.id} className="border-0 rounded-0 shadow-none" style={{
                                        borderBottom: '1px solid #f0f0f0',
                                        backgroundColor: '#ffffff'
                                    }}>
                                        <Card.Body className="p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h6 className="m-0 fw-semibold" style={{ color: '#333333' }}>{contact.name}</h6>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        style={{ color: 'blue', minWidth: '40px' }}
                                                        onClick={() => handleEditClick(contact)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className="p-3"
                                                        style={{ color: 'red', minWidth: '40px' }}
                                                        onClick={() => onDelete(contact.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-1">
                                                <i className="bi bi-envelope me-2" style={{ color: '#999999', width: '20px' }}></i>
                                                <span className="small" style={{ color: '#666666' }}>{contact.email}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-telephone me-2" style={{ color: '#999999', width: '20px' }}></i>
                                                <span className="small" style={{ color: '#666666' }}>{contact.phone}</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            ))}
                        </div>

                        {contacts.length === 0 && (
                            <div className="py-5 text-center" style={{ 
                                color: '#999999',
                                backgroundColor: '#fafafa',
                                borderTop: '1px solid #f0f0f0'
                            }}>
                                <i className="bi bi-person-plus fs-4 mb-2" style={{ opacity: 0.5 }}></i>
                                <p className="m-0">No contacts found</p>
                                <p className="small m-0">Add your first contact to get started</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ContactList;