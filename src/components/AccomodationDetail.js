import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../config';

const AccommodationDetail = () => {
    const { id } = useParams();
    const [accommodation, setAccommodation] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/accommodations/${id}`)
            .then(response => response.json())
            .then(data => setAccommodation(data))
            .catch(error => console.error('Error fetching accommodation:', error));
    }, [id]);

    if (!accommodation) return <div>Loading...</div>;

    return (
        <div>
            <h1>{accommodation.name}</h1>
            <p>Address: {accommodation.address}</p>
            <p>User ID: {accommodation.user.id}</p>
        </div>
    );
};

export default AccommodationDetail;
