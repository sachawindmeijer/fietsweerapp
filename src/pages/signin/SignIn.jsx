import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form'
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import "./SignIn.css"
import InputField from "../../components/inputField/InputField.jsx";


function SignIn() {
    const {handleSubmit, register} = useForm();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    useEffect(() => {
        console.log("register", register)
    }, [register]);
    async function onSubmit(data) {
        // e.response();
        toggleError(false);
        console.log('onsubmit dubble data:',data)

        try {
            const result = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                    username: data.username,
                    password: data.password,
                }
            );
            console.log(result.data);

            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
            navigate('/profiel')

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
                        <label htmlFor="username-field" className="input-container">
                            Gebruikersnaam:
                            <input
                                type="text"
                                {...register("username")

                                }
                            />

                                className="signin-input-field"
                            />
                        </label>

                        <label htmlFor="password-field" className="input-container">
                            Wachtwoord:
                            <input
                                type="text"
                                {...register("password")

                                }
                            />
                        </label>
                        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

                        <button type="submit">Inloggen</button>


                        {loading && <p className="loading">Laden...</p>}
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