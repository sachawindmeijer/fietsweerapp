import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import "./SignIn.css";
import InlogField from "../../components/inputField/InlogField.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";


function SignIn() {
    const {handleSubmit, register} = useForm();

    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);

    async function onSubmit(data) {
        console.log("BANAAN", data)
        toggleError(false);

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: data.username,
                password: data.password
            });

            console.log("api Response", result.data);

            // geef de JWT token aan de login-functie van de context mee
            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            console.log("Error Response:", e.response ? e.response.data : e.message)
            toggleError(true);
        }
    }

    return (
        <div>
            <main>
                <div className="background">
                    <HeaderWeather/>
                    <NavBar/>
                    <div className="outer-container">
                        <section className="form-wrapper">
                            <p className="form-header">Vul het formulier in om in te loggen</p>
                            {/*<div className="form-container">*/}
                                <form onSubmit={handleSubmit(onSubmit)} className="form">
                                    <label htmlFor="username-field" className="input-container">
                                        Gebruikersnaam:
                                        <InlogField
                                            type="text"
                                            id="username-field"
                                            register={register}
                                            placeholder="Je gebruikersnaam"
                                        />
                                    </label>

                                    <label htmlFor="password-field" className="input-container">
                                        Wachtwoord:
                                        <InlogField
                                            type="password"
                                            id="password-field"
                                            register={register}
                                            placeholder="Je wachtwoord"
                                        />
                                    </label>
                                    {error &&
                                        <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

                                    <Button
                                        className="form-button"
                                        type="submit"
                                        text='Inloggen'
                                    />
                                </form>
                            {/*</div>*/}
                        </section>
                        <p className="out-text">Heb je nog geen account? <Link to="/registreren">Registreer</Link> je
                            dan eerst.</p>
                    </div>
                    <Footer/>
                </div>

            </main>

        </div>
    );
}

export default SignIn;