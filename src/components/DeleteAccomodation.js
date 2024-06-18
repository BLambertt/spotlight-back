import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const DeleteAccommodation = () => {
    const { id } = useParams();
    const history = useNavigate();

    const handleDelete = () => {
        fetch(`${API_URL}/accommodations/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('Accommodation deleted');
                history.push('/accommodations');
            })
            .catch(error => console.error('Error deleting accommodation:', error));
    };

    return (
        <div>
            <h1>Delete Accommodation</h1>
            <p>Are you sure you want to delete this accommodation?</p>
            <button onClick={handleDelete}>Yes, delete</button>
        </div>
    );
};

export default DeleteAccommodation;
