import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import './navBar.css'

function NavBar() {
    const {loggedIn, logout} = useContext(AuthContext)

    return (
        <nav className="outer-container">
            <ul className="nav-links">
                <li>
                    <Link to="/" exact
                             className="navbar-link"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    {loggedIn ? <Link
                        to="/loguit"
                        onClick={logout}
                        className="navbar-link"
                    >
                        Log Uit
                    </Link> : <Link
                        to="/login"
                        className="link"
                    >
                        Log in
                    </Link>}
                </li>
                <li>
                    <Link to="/profiel"
                             className="link"
                    >
                        Profiel
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar