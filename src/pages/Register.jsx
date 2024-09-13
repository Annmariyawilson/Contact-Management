import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../Services/AllApis';

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

    const handleRegister = async () => {
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
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <div className="mb-3">
                <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
            </div>
            <button onClick={handleRegister} className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            <p className="mt-3">
                Already have an account? <Link to='/login'>Login here</Link>
            </p>
        </div>
    );
}

export default Register;
