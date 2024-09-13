import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" style={{ fontSize: '24px' }}>
                    <i className="fas fa-address-book" style={{ color: '#007bff', fontSize: '24px', marginRight: '8px' }}></i>
                    Contact Hub
                </Navbar.Brand>
                <button className='btn btn-primary' onClick={logout}>Logout</button>
            </Container>
        </Navbar>
    );
}

export default Header;
