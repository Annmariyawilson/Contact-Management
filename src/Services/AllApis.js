import axios from 'axios';

const API_URL = 'https://contact-management-4flm.onrender.com'; 


export const registerApi = async (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};


export const loginApi = async (credentials) => {
    const users = await axios.get(`${API_URL}/users`);
    const user = users.data.find(
        (u) => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
        return { status: 201, data: user };
    } else {
        return { status: 401, message: "Invalid email or password" };
    }
};


export const fetchContacts = async () => {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data;
};

export const updateContact = async (id, updatedContact) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, updatedContact);
    return response.data;
};

export const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`);
};
export const getContacts = async () => axios.get(`${API_URL}/contacts`);
export const addContact = async (contact) => axios.post(`${API_URL}/contacts`, contact);
