import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API_URL from '../config';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    const handleDelete = () => {
        fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('User deleted');
                navigate('/users');
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>

            <div>
                <button onClick={() => navigate(`/users/${id}/edit`)}>Edit User</button>
                <button onClick={handleDelete}>Delete User</button>
                <Link to={`/users/${id}/accommodations`}>
                    <button>View Accommodations</button>
                </Link>
            </div>
        </div>
    );
};

export default UserDetail;
