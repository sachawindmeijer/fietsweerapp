import "./SignOut.css"
import {useNavigate} from "react-router-dom";
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
                        <p>U bent uitgelogd.</p>
                        <p>Bedankt voor u bezoek en tot snel</p>
                    </span>
                    <p>Iets mis?</p>
                    <Button
                        className="page-button"
                        type="button"
                        onClick={() => navigate('/signin')}
                        text='Log In'
                    />
                    <p>Uit</p>
                    <Button
                        className="page-button"
                        type="button"
                        onClick={() => navigate("/")}
                        text='Home'
                    />
                </div>
            </div>
        </div>
    )
}

export default SignOut
