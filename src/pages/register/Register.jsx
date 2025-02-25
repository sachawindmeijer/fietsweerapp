import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import {ErrorMessage} from "@hookform/error-message";
import "./Register.css";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import InputField from "../../components/inputField/InputField.jsx";

function Register() {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiKey = import.meta.env.VITE_DATA_API_KEY;
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        return () => {
            console.log("Annuleren van lopende requests");
            controller.abort();
        };
    }, []);

    const onSubmit = async (data) => {
        console.log('Form Submitted:', data);
        setError('');
        setLoading(true);

        const controller = new AbortController();

        try {
            await axios.post('https://api.datavortex.nl/fietsweerapp/users', {
                username: data.username,
                email: data.email,
                password: data.password,
                authorities: [{ "authority": "USER" }],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey,
                },
                signal: controller.signal,
            });
            navigate('/login');
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request geannuleerd");
            } else {
                console.error('Request failed:', error.message);
                if (error.response && error.response.status === 409) {
                    setError('Dit e-mailadres is al in gebruik. Probeer een ander e-mailadres.');
                } else {
                    setError('Er is een onbekende fout opgetreden. Probeer het later opnieuw.');
                }
            }
        }
        setLoading(false);
    };

    return (
    <main>
        <div className="background">
            <HeaderWeather />
            <NavBar />

            <div className="outer-container">
                <div className="inner-container">

                <section className="form-wrapper">

                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <fieldset>
                            <legend>Vul het formulier in om je te registreren.</legend>
                            <div className="input-container">
                                <label htmlFor="username-field">Gebruikersnaam:</label>
                                <InputField
                                    type="text"
                                    id="username-field"
                                    name="username"
                                    placeholder="Gebruikersnaam"
                                    register={register("username", { required: "Dit moet ingevuld zijn" })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="username"
                                    render={({ message }) => <p className="error">{message}</p>}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="email-field">E-mail:</label>
                                <InputField
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    placeholder="E-mail"
                                    register={register("email", {
                                        required: "Dit moet ingevuld zijn",
                                        pattern: { value: /^(.+)@(.+)$/, message: "Er mist nog een @" },
                                    })}

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => <p className="error">{message}</p>}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="password-field">Wachtwoord:</label>
                                <InputField
                                    type="password"
                                    id="password-field"
                                    name="password"
                                    placeholder="Wachtwoord"
                                    register={register("password", {
                                        required: "Dit moet ingevuld zijn",
                                        minLength: { value: 6, message: "Het wachtwoord is te kort" },
                                    })}

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <p className="error">{message}</p>}
                                />
                            </div>
                        </fieldset>

                        {error && <p className="error">{error}</p>}

                        <Button
                            className="buttonR"
                            type="submit"
                            disabled={loading}
                            text="Registreren"
                        />
                    </form>
                </section>
                    <p className="account-info">
                        Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.
                    </p>
            </div>

            </div>
            <Footer />
        </div>
    </main>
);
}

export default Register;