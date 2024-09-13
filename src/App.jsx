import React from 'react';
import './App.css';
import './bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Header from './Components/Header';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
