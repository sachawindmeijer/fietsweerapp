import React from "react";
import './Profile.css'
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import SaveLocation from "../../components/savelocation/SaveLocation.jsx";
import Preferences from "../../components/preferences/Preferences.jsx";
import Footer from "../../components/footer/Footer.jsx";
import fetchWeather from "../../components/weather/weather.jsx";


function Profile() {
    return (
            <main>
                <div className="background">
                    <HeaderWeather/>
                    <NavBar/>
                    <div className="outer-container">

                        <div className="preferences-inner-container">
                            <section className="saved-cities-container">
                                <SaveLocation
                                    fetchWeather={fetchWeather}
                                    maxLocations={3}
                                    onError={(message) => console.error(message)}
                                />
                            </section>
                            <section className="preferences-container">
                                <Preferences/>
                            </section>
                        </div>
                    </div>
                    <Footer/>
                </div>

            </main>
    )
}

export default Profile;