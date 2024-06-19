import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const AccommodationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [accommodation, setAccommodation] = useState(null);
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/accommodations/${id}`)
            .then(response => response.json())
            .then(data => setAccommodation(data))
            .catch(error => console.error('Error fetching accommodation:', error));
    }, [id]);

    const handleAddRoom = (e) => {
        e.preventDefault();
        const room = { name: roomName, accommodation: { id } };

        fetch(`${API_URL}/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        })
            .then((response) => response.json())
            .then((data) => {
                setAccommodation((prev) => ({
                    ...prev,
                    rooms: [...prev.rooms, data],
                }));
                setRoomName('');
            })
            .catch((error) => console.error('Error adding room:', error));
    };

    const handleDeleteRoom = (roomId) => {
        fetch(`${API_URL}/rooms/${roomId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setAccommodation((prev) => ({
                    ...prev,
                    rooms: prev.rooms.filter(room => room.id !== roomId),
                }));
            })
            .catch((error) => console.error('Error deleting room:', error));
    };

    if (!accommodation) return <div>Loading...</div>;

    return (
        <div>
            <h1>{accommodation.name}</h1>
            <p>Address: {accommodation.address}</p>

            <h2>Rooms</h2>
            <ul>
                {accommodation.rooms.map((room) => (
                    <li key={room.id}>
                        {room.name}
                        <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddRoom}>
                <h3>Add Room</h3>
                <div>
                    <label>Room Name</label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Room</button>
            </form>
        </div>
    );
};

export default AccommodationDetail;
