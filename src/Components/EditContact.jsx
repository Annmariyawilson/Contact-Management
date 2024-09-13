import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { updateContact as updateContactApi } from '../Services/AllApis';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditContact({ contact, onCancel, onUpdate }) {
    const [updatedContact, setUpdatedContact] = useState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUpdatedContact({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        });
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await updateContactApi(contact.id, updatedContact);
            if (typeof onUpdate === 'function') {
                onUpdate(result.data); 
            }
            toast.success("Contact updated successfully!");
            onCancel();
        } catch (error) {
            toast.error("Failed to update contact.");
            console.error("Update contact error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="my-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={updatedContact.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={updatedContact.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={updatedContact.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button type="submit" variant="success" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Contact'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={onCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

EditContact.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
};

export default EditContact;
