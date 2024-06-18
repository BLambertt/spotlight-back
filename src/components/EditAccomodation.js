import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const EditAccommodation = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/accommodations/${id}`)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setAddress(data.address);
                setUserId(data.user.id);
            })
            .catch(error => console.error('Error fetching accommodation:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const accommodation = { name, address, user: { id: userId } };

        fetch(`${API_URL}/accommodations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accommodation)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Accommodation updated:', data);
                history.push('/accommodations');
            })
            .catch(error => console.error('Error updating accommodation:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Accommodation</h1>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>User ID</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Update Accommodation</button>
        </form>
    );
};

export default EditAccommodation;
