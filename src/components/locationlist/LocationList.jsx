import React from 'react';
import Button from "../button/Button.jsx";

function LocationList({ locations, onDeleteLocation }) {
    return (
        <section>
            {locations.map(({ id, location }) => (
                <article key={id} className="location-card">
                    <p className="location-name">{location}</p>
                    <Button
                        type="button"
                        onClick={() => onDeleteLocation(id)}
                        className="delete-button"
                        text="Verwijder de locatie"
                    />
                </article>
            ))}
        </section>
    );
}

export default LocationList;