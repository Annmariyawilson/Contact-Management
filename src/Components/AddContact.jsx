import React, { useState } from 'react';
import { addContact } from '../Services/AllApis';
import { toast } from 'react-toastify';
import contactImg from '../assets/contact.png';
import { Card, Form, Button, Spinner, Container, Row, Col, Image } from 'react-bootstrap';

function AddContact({ onAddContact }) {
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!contact.name.trim() || contact.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contact.phone)) {
            newErrors.phone = 'Phone must be a 10-digit number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

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
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xl={10}>
                    <Card className="border-0 overflow-hidden shadow-lg">
                        <Row className="g-0">
                            {/* Left Column - Image + Info */}
                            <Col md={5} className="d-flex align-items-center p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="text-center w-100">
                                    <Image 
                                        src={contactImg} 
                                        alt="Contact illustration" 
                                        fluid 
                                        className="mb-4"
                                        style={{ maxHeight: '180px' }}
                                    />
                                    <h2 className="fw-bold mb-3 text-dark">Add New Contact</h2>
                                    <p className="text-muted mb-0 px-lg-4">
                                        Keep your connections organized. Add contacts to your digital address book 
                                        and access them anytime, anywhere.
                                    </p>
                                </div>
                            </Col>

                            {/* Right Column - Form */}
                            <Col md={7} className="bg-white">
                                <Card.Body className="p-4 p-lg-5">
                                    <div className="mb-4">
                                        <h3 className="fw-bold text-dark mb-1">Contact Details</h3>
                                        <p className="text-muted small">Fill in the information below</p>
                                    </div>
                                    
                                    <Form onSubmit={handleSubmit} noValidate>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label className="fw-medium text-dark">Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={contact.name}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                                className="py-3 px-3 rounded-3 border-0"
                                                style={{ backgroundColor: '#f8f9fa' }}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label className="fw-medium text-dark">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={contact.email}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                required
                                                className="py-3 px-3 rounded-3 border-0"
                                                style={{ backgroundColor: '#f8f9fa' }}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formPhone">
                                            <Form.Label className="fw-medium text-dark">Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={contact.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                required
                                                className="py-3 px-3 rounded-3 border-0"
                                                style={{ backgroundColor: '#f8f9fa' }}
                                                isInvalid={!!errors.phone}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className="d-grid mt-4">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={loading}
                                                className="py-3 rounded-3 fw-bold border-0"
                                                style={{ backgroundColor: '#4e44dc' }}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Spinner animation="border" size="sm" className="me-2" />
                                                        Adding Contact...
                                                    </>
                                                ) : (
                                                    'Add Contact'
                                                )}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddContact;
