import React, { useState } from 'react';
import InputField from "../inputField/InputField.jsx";
import Button from "../button/Button.jsx";
import "./LocationForm.css"
function LocationForm({ onAddLocation, error, loading, placeholder = "Voer hier de locatie in", buttonText = "Voeg de locatie toe" }) {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onAddLocation(location);
            setLocation('');
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="input-button-container">
                <InputField
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={placeholder}
                    className={`location-input ${error ? 'error-input' : ''}`}
                />
                <Button
                    type="submit"
                    disabled={loading}
                    text={loading ? 'Bezig...' : buttonText}
                    className="form-button"
                />
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default LocationForm;