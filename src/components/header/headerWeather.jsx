import React from "react";
import {useLocation} from "react-router-dom";
import './HeaderWeather.css'

function HeaderWeather() {
    const location = useLocation();

    function getPageName() {
        switch (location.pathname) {
            case "/" :
                return "Home"
            case "/login" :
                return "Login"
            case "/registreren" :
                return "Account Registratie"
            case "/profiel" :
                return "Profiel"
            case "/loguit" :
                return "Loguit"
            default:
                return null
        }
    }

    return (
        <header className="headerBar">
            <h1>FIETSWEER</h1>
            <h3>{getPageName()}</h3>
        </header>
    )
}

export default HeaderWeather