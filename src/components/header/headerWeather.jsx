import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './HeaderWeather.css'

function HeaderWeather({ title}) {
    const location = useLocation();
    const navigate = useNavigate();

    function getPageName() {
        switch (location.pathname) {
            case "/" :
                return "Home";
            case "/login" :
                return "Login";
            case "/registreren" :
                return "Account Registratie";
            case "/profiel" :
                return "Profiel";
            case "/loguit" :
                return "Loguit";
            default:
                return "Onbekende pagina";
        }
    }
    const handleClick = () => {
        navigate("/");
    };
    return (
        <header className="headerBar" onClick={handleClick}>
            <h1>{title}</h1>
            <h3>{getPageName()}</h3>
        </header>
    );
}

export default HeaderWeather;