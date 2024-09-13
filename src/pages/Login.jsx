import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../Services/AllApis';

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { email, password } = user;

        if (!email || !password) {
            toast.warning("Please enter both email and password");
            return;
        }

        try {
            setLoading(true);
            const response = await loginApi(user);

            if (response.status === 201) {
                toast.success("Login successful!");
                sessionStorage.setItem("userData", JSON.stringify(response.data));
                navigate('/home');
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
                <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
            </div>
            <button onClick={handleLogin} className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="mt-3">
                Don't have an account? <Link to='/register'>Register here</Link>
            </p>
        </div>
    );
}

export default Login;
