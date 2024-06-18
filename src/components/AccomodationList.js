import React, { useEffect, useState } from 'react';
import API_URL from '../config';

const AccommodationsList = () => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/accommodations`)
            .then(response => response.json())
            .then(data => setAccommodations(data))
            .catch(error => console.error('Error fetching accommodations:', error));
    }, []);

    return (
        <div>
            <h1>Accommodations</h1>
            <ul>
                {accommodations.map(accommodation => (
                    <li key={accommodation.id}>{accommodation.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AccommodationsList;
