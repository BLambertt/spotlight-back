import React, { useState } from 'react';
import API_URL from '../config';

const AddAccommodation = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const accommodation = { name, address, user: { id: userId } };

        fetch(`${API_URL}/accommodations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accommodation)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Accommodation added:', data);
                setName('');
                setAddress('');
                setUserId('');
            })
            .catch(error => console.error('Error adding accommodation:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Accommodation</h1>
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
            <button type="submit">Add Accommodation</button>
        </form>
    );
};

export default AddAccommodation;
