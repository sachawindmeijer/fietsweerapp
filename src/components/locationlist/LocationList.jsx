import React from 'react';
import Button from "../button/Button.jsx";
import "./LocationList.css"

function LocationList({ locations = [], onDeleteLocation }) {
    if (!Array.isArray(locations)) {
        console.error('Locations is geen array:', locations);
        return <p>Er is een onverwachte fout opgetreden.</p>;
    }

    return (
        <section>
            {locations.map(({ id, location }) => {
                if (!id || !location) {
                    console.warn('Ongeldig locatie-item:', { id, location });
                    return null;
                }

                return (
                    <div className="list-container">
                    <article key={id} className="location-card">
                        <p className="location-name">{location}</p>
                        {onDeleteLocation && (
                            <Button
                                type="button"
                                onClick={() => onDeleteLocation(id)}
                                className="delete-button"
                                text="Verwijder de locatie"
                            />
                        )}
                    </article>
                    </div>
                );
            })}
        </section>
    );
}

export default LocationList;
