import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form'
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import "./SignIn.css"
import InlogField from "../../components/inputField/InlogField.jsx";
import Button from "../../components/button/Button.jsx";


function SignIn() {
    const {handleSubmit, register} = useForm();

    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);

    // const source = axios.CancelToken.source();

    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    // useEffect(() => {
    //     return function cleanup() {
    //         source.cancel();
    //     }
    // }, []);

    async function onSubmit(data) {
        console.log("BANAAN", data)
        toggleError(false);

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: data.username,
                password: data.password
            });
            // , {
            //         cancelToken: source.token,
            //     }
            // log het resultaat in de console
            console.log(result.data);

            // geef de JWT token aan de login-functie van de context mee
            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            console.log(e);
            toggleError(true);
        }
    }

    return (
        <div className="background">
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <section className="form-container">
                    <p>Vul het formulier in om in te loggen</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <label htmlFor="email-field" className="input-container">
                            Gebruikersnaam:
                            <InlogField
                                type="text"
                                id="username-field"
                                register={register}
                                placeholder="Je gebruikersnaam"
                                // className="signin-input-field"
                            />
                        </label>

                        <label htmlFor="password-field" className="input-container">
                            Wachtwoord:
                            <InlogField
                                type="password"
                                id="password-field"
                                register={register}
                                placeholder="Je wachtwoord"

                                // className="signin-input-field"
                            />
                        </label>
                        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

                        <Button
                            className="form-button"
                            type="submit"
                            text='Inloggen'
                        />
                    </form>

                </section>
                <p className="out-text">Heb je nog geen account? <Link to="/registreren">Registreer</Link> je dan eerst.
                </p>
            </div>
        </div>
    )
        ;
}

export default SignIn;