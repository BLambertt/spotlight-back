import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../config';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [lights, setLights] = useState([]);
    const [lightName, setLightName] = useState('');
    const [interrupterName, setInterrupterName] = useState('');
    const [interrupters, setInterrupters] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/rooms/${id}`)
            .then(response => response.json())
            .then(data => {
                setRoom(data);
                setLights(data.lights || []);
            })
            .catch(error => console.error('Error fetching room:', error));
    }, [id]);

    const handleAddLight = (e) => {
        e.preventDefault();
        const light = { name: lightName, room: { id } };

        fetch(`${API_URL}/lights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(light),
        })
            .then((response) => response.json())
            .then((data) => {
                setLights([...lights, data]);
                setLightName('');
            })
            .catch((error) => console.error('Error adding light:', error));
    };

    const handleAddInterrupter = (e, lightId) => {
        e.preventDefault();
        const interrupter = { name: interrupterName, light: { id: lightId } };

        fetch(`${API_URL}/interrupters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interrupter),
        })
            .then((response) => response.json())
            .then((data) => {
                setInterrupters((prev) => ({
                    ...prev,
                    [lightId]: [...(prev[lightId] || []), data],
                }));
                setInterrupterName('');
            })
            .catch((error) => console.error('Error adding interrupter:', error));
    };

    const handleDeleteLight = (lightId) => {
        fetch(`${API_URL}/lights/${lightId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setLights(lights.filter(light => light.id !== lightId));
            })
            .catch((error) => console.error('Error deleting light:', error));
    };

    const handleDeleteInterrupter = (interrupterId, lightId) => {
        fetch(`${API_URL}/interrupters/${interrupterId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setInterrupters((prev) => ({
                    ...prev,
                    [lightId]: prev[lightId].filter(interrupter => interrupter.id !== interrupterId),
                }));
            })
            .catch((error) => console.error('Error deleting interrupter:', error));
    };

    if (!room) return <div>Loading...</div>;

    return (
        <div>
            <h1>{room.name}</h1>

            <h2>Lights</h2>
            <ul>
                {lights.map((light) => (
                    <li key={light.id}>
                        {light.name}
                        <button onClick={() => handleDeleteLight(light.id)}>Delete</button>
                        <h3>Interrupters</h3>
                        <ul>
                            {(interrupters[light.id] || []).map((interrupter) => (
                                <li key={interrupter.id}>
                                    {interrupter.name}
                                    <button onClick={() => handleDeleteInterrupter(interrupter.id, light.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={(e) => handleAddInterrupter(e, light.id)}>
                            <div>
                                <label>Interrupter Name</label>
                                <input
                                    type="text"
                                    value={interrupterName}
                                    onChange={(e) => setInterrupterName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Add Interrupter</button>
                        </form>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddLight}>
                <h3>Add Light</h3>
                <div>
                    <label>Light Name</label>
                    <input
                        type="text"
                        value={lightName}
                        onChange={(e) => setLightName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Light</button>
            </form>
        </div>
    );
};

export default RoomDetail;
