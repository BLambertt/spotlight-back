import React, { useEffect, useState } from 'react';
import API_URL from '../config';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
