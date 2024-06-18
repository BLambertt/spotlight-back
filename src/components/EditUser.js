import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const EditUser = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/users/${id}`)
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
            })
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, email, password };

        fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User updated:', data);
                history.push('/users');
            })
            .catch(error => console.error('Error updating user:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit User</h1>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Update User</button>
        </form>
    );
};

export default EditUser;
