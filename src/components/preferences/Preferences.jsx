import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {PreferencesContext} from "../../context/PreferencesContext";
import "./Preferences.css"
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";
import InputField from "../inputField/InputField.jsx";

function Preferences() {
    const navigate = useNavigate();
    const [preferencesList, setPreferencesList] = useContext(PreferencesContext)
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            temperature: preferencesList.preferredWeather.temperature,
            cloudiness: preferencesList.preferredWeather.cloudiness,
            windspeed: preferencesList.preferredWeather.windspeed,
        }
    })

    const watchCloudiness = watch("cloudiness")
    const watchWindspeed = watch("windspeed")

    const onSubmit = data => {
        console.log("voorkeur", data);
        if (data) {
            let uniqueId =
                new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newPreferences = {
                id: uniqueId,
                preferredWeather: data,
            };
            setPreferencesList(newPreferences);
            localStorage.setItem('preferences', JSON.stringify(newPreferences));

            navigate('/');
        }
    };

    return (
      <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article>
                    <h3>Temperatuurvoorkeur</h3>
                    <p>Koud - Warm</p>
                    <InputField
                        type="range"
                        id="temperature"
                        placeholder="temperature"
                        register={register("temperature")}
                    />

                </article>
                <article>
                    <p>Bewolking:{watchCloudiness}%</p>
                    <InputField
                        type="range"
                        id="cloudiness"
                        placeholder="cloudiness"
                        register={register("cloudiness")}
                    />
                </article>
                <article>
                    <p>Windkracht: {watchWindspeed}</p>
                    <InputField
                        type="range"
                        id="windspeed"
                        placeholder="windspeed"
                        max="12"
                        register={register("windspeed")}
                    />
                </article>
                <div className="button-container" >
                <Button
                    className='preferences-button'
                    type="submit"
                    text='Opslaan'
                />
                </div>
            </form>

        </main>
    )
}

export default Preferences