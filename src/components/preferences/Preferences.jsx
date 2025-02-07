import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {PreferencesContext} from "../../context/PreferencesContext";
import "./Preferences.css"
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";
import InputField from "../inputField/InputField.jsx";

import {LocationContext} from "../../context/LocationContext.jsx";

function Preferences({ defaultValues = {}, onSave }) {
    const navigate = useNavigate();
    const [preferencesList] = useContext(PreferencesContext);
    const [locationList] = useContext(LocationContext);

    const formDefaultValues = {
        temperature: defaultValues.temperature || preferencesList.preferredWeather.temperature,
        cloudiness: defaultValues.cloudiness || preferencesList.preferredWeather.cloudiness,
        windspeed: defaultValues.windspeed || preferencesList.preferredWeather.windspeed,
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
        console.log("Formuliergegevens:", data); // Controleer de output
        if (onSave) {
            onSave(data);
        }
        // Navigeer naar home nadat je de gegevens hebt opgeslagen
        navigate('/');
    };

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <article>
                    <h4>Weervoorkeur</h4>
                    <p>Koud - Warm</p>
                    <InputField
                        type="range"
                        id="temperature"
                        min="0"
                        max="60"

                        {...register("temperature")}
                    />
                </article>

                {/* Bewolking */}
                <article>
                    <p>Bewolking: {watchCloudiness}%</p>
                    <InputField
                        type="range"
                        id="cloudiness"
                        min="0"
                        max="100"

                        {...register("cloudiness")}
                    />
                </article>

                {/* Windsnelheid */}
                <article>
                    <p>Windkracht: {watchWindspeed}</p>
                    <InputField
                        type="range"
                        id="windspeed"
                        min="0"
                        max="12"
                        {...register("windspeed")}
                    />
                </article>

                {/* Opslaan-knop */}
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