import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import "./SignIn.css";

import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import isTokenValid from "../../helpers/isTokenValid.jsx";
import InputField from "../../components/inputField/InputField.jsx";



function SignIn() {
    const {handleSubmit, register} = useForm();
    const apiKey = import.meta.env.VITE_DATA_API_KEY;
    const [error, setError] = useState(false);
    const {login} = useContext(AuthContext);

    async function onSubmit(data) {
        console.log("signin", data)
        setError(false);

        try {
            const result = await axios.post('https://api.datavortex.nl/fietsweerapp/users/authenticate', {
                username: data.username,
                password: data.password
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey
                }
            });

            console.log("API Response:", result.data);

            const token = result.data.jwt;

            if (isTokenValid(token)) {
                console.log("Token is valid!");
                login(token);
            } else {
                console.error("Token is invalid or expired.");
                setError(true);
            }

        } catch (e) {
            console.error("Error:", e);
            console.log("Error Response:", e.response ? e.response.data : e.message);
            if (e.response && e.response.data) {
                console.log("Error details:", e.response.data);
            }
            setError(true);
        }
    }

    return (

        <main>
            <div className="background">
                <HeaderWeather />
                <NavBar />
                <div className="outer-container">
                    <div className="inner-container">
                    <section className="form-wrapper">
                        {/*<p className="form-header">Vul het formulier in om in te loggen</p>*/}
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <fieldset>
                                <legend>Vul het formulier in om in te loggen</legend>
                                <div className="input-container">
                                    <label htmlFor="username-field">Gebruikersnaam:</label>
                                    <InputField
                                        type="text"
                                        id="username-field"
                                        placeholder="Je gebruikersnaam"
                                        {...register('username', { required: 'Gebruikersnaam is verplicht' })}
                                    />
                                    {error.username && (
                                        <p className="error">{error.username.message}</p>
                                    )}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="password-field">Wachtwoord:</label>
                                    <InputField
                                        type="password"
                                        id="password-field"
                                        placeholder="Je wachtwoord"
                                        {...register('password', { required: 'Wachtwoord is verplicht' })}
                                    />
                                    {error.password && (
                                        <p className="error">{error.password.message}</p>
                                    )}
                                </div>
                            </fieldset>

                            {error && (
                                <p className="error">
                                    Combinatie van emailadres en wachtwoord is onjuist
                                </p>
                            )}

                            <Button className="form-button" type="submit" text="Inloggen" />
                        </form>
                    </section>
                    <p className="account-info">
                        Heb je nog geen account? Je kunt je  {' '}
                        <Link to="/registreren">hier</Link> registreren.
                    </p>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}

export default SignIn;