import React, { useState } from 'react';
import InputField from "../inputField/InputField.jsx";
import Button from "../button/Button.jsx";

function LocationForm({ onAddLocation, error, loading }) {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onAddLocation(location);
            setLocation('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input-button-container">
            <div>
                <InputField
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Voer hier de locatie in"
                    className={`location-input ${error ? 'error-input' : ''}`}
                />
                <Button
                    type="submit"
                    disabled={loading}
                    text={loading ? 'Bezig...' : 'Voeg de locatie toe'}
                    className="submit-button"
                />
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default LocationForm;