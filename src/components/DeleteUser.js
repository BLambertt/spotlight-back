import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const DeleteUser = () => {
    const { id } = useParams();
    const history = useNavigate();

    const handleDelete = () => {
        fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('User deleted');
                history.push('/users');
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div>
            <h1>Delete User</h1>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleDelete}>Yes, delete</button>
        </div>
    );
};

export default DeleteUser;
