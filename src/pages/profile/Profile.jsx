import React from "react";
// import {Link} from "react-router-dom";
import "/profile.css"
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import SaveCities from "../../components/savecities/SaveCities.jsx";
import Preferences from "../../components/preferences/Preferences.jsx";

function Profile() {
    return (
        <div className="background">
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <div className="text-city-pref-container">
                     <span className="text-container">
                         <p>Pas jouw voorkeuren hier aan.</p>
                     </span>
                    <div className="city-and-preferences-container">
                        <section className="saved-cities-container">
                            <SaveCities/>
                        </section>
                        <section className="preferences-container">
                            <Preferences/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;