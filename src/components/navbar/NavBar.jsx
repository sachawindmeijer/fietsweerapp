import React, {useContext} from "react";
import {Link,} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./NavBar.css"
import Button from "../button/Button.jsx";


function NavBar() {
    const {isAuth, logout} = useContext(AuthContext)

    function handleLogout() {
        logout();
        console.log("User logged out");
    }

    return (
        <nav className="nav-bar">
                               <ul className="nav-links">
                        <li className="links">
                            <Link to="/">Home
                            </Link>
                        </li>

                        <li className="links">
                            {isAuth ? (
                                <Button className="logout-button" onClick={handleLogout}>
                                    Log uit
                                </Button>
                            ) : (
                                <Link to="/login">Log in</Link>
                            )}
                            </li>
                            <li className="links">
                                <Link
                                    to="/registreren"
                                >Registreren
                                </Link>
                            </li>
                    </ul>
        </nav>
    )
}


export default NavBar;