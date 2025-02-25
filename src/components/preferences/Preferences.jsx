import React from "react";
import {useForm} from "react-hook-form";

import "./Preferences.css"
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";
import InputField from "../inputField/InputField.jsx";



function Preferences({ defaultValues = {}, onSave }) {
    const navigate = useNavigate();
    const storedLocations = localStorage.getItem("locations");
    const locationList = storedLocations ? JSON.parse(storedLocations) : [];

    const storedPreferences = localStorage.getItem("preferences");
    const parsedPreferences =
        storedPreferences && storedPreferences !== "undefined"
            ? JSON.parse(storedPreferences)
            : { preferredWeather: { temperature: 0, cloudiness: 0, windspeed: 0 } };


    const formDefaultValues = {
        temperature: defaultValues.temperature || parsedPreferences.preferredWeather.temperature,
        cloudiness: defaultValues.cloudiness || parsedPreferences.preferredWeather.cloudiness,
        windspeed: defaultValues.windspeed || parsedPreferences.preferredWeather.windspeed,
        ...defaultValues
    };

    const { register, handleSubmit, watch } = useForm({
        defaultValues: formDefaultValues,
    });

    const watchCloudiness = watch("cloudiness");
    const watchWindspeed = watch("windspeed");
    console.log(watchWindspeed);

    const isSaveDisabled = locationList.length === 0;

    const onSubmit = (data) => {
        console.log("Formuliergegevens:", data);

        const updatedPreferences = {
            preferredWeather: {
                temperature: data.temperature,
                cloudiness: data.cloudiness,
                windspeed: data.windspeed,
            },
        };
        localStorage.setItem("preferences", JSON.stringify(updatedPreferences));

        if (onSave) {
            onSave(data);
        }
        navigate("/");
    };


    return (
        <main>
            <h4>Weervoorkeur</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Temparatuur</legend>
                    <div className="preference-input">
                    <InputField
                        type="range"
                        id="temperature"
                        min="0"
                        max="60"
                        {...register('temperature')}
                    />
                    <label htmlFor="temperature">Koud - Warm</label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Bewolking</legend>
                    <div className="preference-input">
                    <InputField
                        type="range"
                        id="cloudiness"
                        min="0"
                        max="100"
                        {...register('cloudiness')}
                    />
                    <label htmlFor="cloudiness">Bewolking: {watchCloudiness}%</label>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Windsnelheid</legend>
                    <div className="preference-input">
                    <InputField
                        type="range"
                        id="windspeed"
                        min="0"
                        max="12"
                        {...register('windspeed')}
                    />
                    <label htmlFor="windspeed">Windkracht: {watchWindspeed}</label>
                    </div>
                </fieldset>


                <div className="button-container">
                    <Button
                        className="preferences-button"
                        type="submit"
                        text="Opslaan"
                        disabled={isSaveDisabled}
                    />
                </div>
            </form>
        </main>
    );
}

export default Preferences