import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../config';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserDetail;
