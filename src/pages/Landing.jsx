import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="container-fluid bg-light text-dark py-5">
            <Row className="align-items-center">
                <Col xs={12} md={6} className="p-5">
                    <h1 className="display-4">Streamline Your Contact Management</h1>
                    <p className="lead" style={{ textAlign: 'justify' }}>
                        Manage your contacts efficiently with our easy-to-use interface. Add, edit, and delete contacts with just a few clicks!
                    </p>
                    <div className="d-grid">
                        <Link to={'/login'}>
                            <Button variant="primary" size="lg">Get Started</Button>
                        </Link>
                    </div>
                </Col>
                <Col xs={12} md={6} className="py-4 text-center">
                    <img
                        src='https://media.licdn.com/dms/image/D4D12AQF4Asyohbjoeg/article-cover_image-shrink_600_2000/0/1684486615733?e=2147483647&v=beta&t=RA3lSajYAy2onZ_7n46VSJCYKNIRrkimCvX6QxjL-gA'
                        alt='Contact Manager'
                        className='img-fluid rounded shadow-lg'
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Landing;
