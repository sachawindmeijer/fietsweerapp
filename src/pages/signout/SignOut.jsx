import "./SignOut.css"
import {Link, useNavigate} from "react-router-dom";
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";

function SignOut() {

    const navigate = useNavigate();

    return (
        <div>
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <div className="button-text-container">
                    <span className="button-text-container">
                        <h4>U bent uitgelogd.</h4>
                        <p>Bedankt voor u bezoek en tot snel</p>
                    </span>
                    <p>Iets mis? log dan opnieuw in</p>

                    <Link to="/login">
                        <Button className="page-button" text="Log In" />
                    </Link>

                    <p>Of liever naar de homepage</p>
                    {/* Using Link for navigation */}
                    <Link to="/">
                        <Button className="page-button" text="Home" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignOut
