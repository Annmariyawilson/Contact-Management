import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../Services/AllApis';
import registerImg from '../assets/register.png';
import { Container, Form, Button, Spinner, Card, Row, Col, Image } from 'react-bootstrap';

function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;

        if (!email || !password) {
            toast.warning("Please fill in both email and password");
            return;
        }

        try {
            setLoading(true);
            const response = await registerApi(user);
            if (response.status === 201) {
                toast.success("Registered successfully!");
                navigate('/login');
            } else {
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="g-0 w-100 justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <Card className="border-0 shadow overflow-hidden">
                        <Row className="g-0">
                            {/* Left Side - Illustration */}
                            <Col md={6} className="d-none d-md-flex bg-primary align-items-center p-5">
                                <div className="text-center w-100">
                                    <Image src={registerImg} fluid className="mb-4" style={{ maxHeight: '250px' }} />
                                    <h3 className="text-white mb-3">Welcome to Our Community</h3>
                                    <p className="text-white-50 mb-0">Join thousands of happy users today</p>
                                </div>
                            </Col>

                            {/* Right Side - Form */}
                            <Col md={6}>
                                <Card.Body className="p-4 p-md-5">
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold mb-2" style={{ color: '#1a365d' }}>Create Account</h2>
                                        <p className="text-muted small">Fill in your details to get started</p>
                                    </div>

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small text-muted mb-1">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                className="py-2 px-3 rounded-2"
                                                style={{ backgroundColor: '#f8f9fa', border: '1px solid #e2e8f0' }}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="small text-muted mb-1">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                placeholder="Create a password"
                                                required
                                                className="py-2 px-3 rounded-2"
                                                style={{ backgroundColor: '#f8f9fa', border: '1px solid #e2e8f0' }}
                                            />
                                        </Form.Group>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-100 py-2 rounded-2 fw-semibold mb-3"
                                            disabled={loading}
                                            style={{ backgroundColor: '#4e44dc', border: 'none' }}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner animation="border" size="sm" className="me-2" />
                                                    Creating Account...
                                                </>
                                            ) : 'Register Now'}
                                        </Button>

                                        <div className="text-center mt-4">
                                            <p className="small text-muted mb-0">
                                                Already have an account?{' '}
                                                <Link 
                                                    to="/login" 
                                                    className="text-decoration-none fw-semibold" 
                                                    style={{ color: '#4e44dc' }}
                                                >
                                                    Sign In
                                                </Link>
                                            </p>
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

export default Register;