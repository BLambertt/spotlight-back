import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../config';

const UserAccommodations = () => {
    const { id } = useParams();
    const [accommodations, setAccommodations] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/users/${id}/accommodations`)
            .then(response => response.json())
            .then(data => setAccommodations(data))
            .catch(error => console.error('Error fetching accommodations:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const accommodation = { name, address, user: { id } };

        fetch(`${API_URL}/accommodations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accommodation),
        })
            .then((response) => response.json())
            .then((data) => {
                setAccommodations([...accommodations, data]);
                setName('');
                setAddress('');
            })
            .catch((error) => console.error('Error adding accommodation:', error));
    };

    return (
        <div>
            <h1>Accommodations for User {id}</h1>
            <ul>
                {accommodations.map((accommodation) => (
                    <li key={accommodation.id}>{accommodation.name}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <h2>Add Accommodation</h2>
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
                <button type="submit">Add Accommodation</button>
            </form>
        </div>
    );
};

export default UserAccommodations;
