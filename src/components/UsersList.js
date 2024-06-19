import React, { useEffect, useState } from 'react';
import API_URL from '../config';
import {Link} from "react-router-dom";

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
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
