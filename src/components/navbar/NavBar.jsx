import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import './navBar.css'

function NavBar() {
    const {loggedIn, logout} = useContext(AuthContext)

    return (
        <nav className="outer-container">
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact
                             className="navbar-link"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    {loggedIn ? <NavLink
                        to="/loguit"
                        onClick={logout}
                        className="navbar-link"
                    >
                        Log Uit
                    </NavLink> : <NavLink
                        to="/login"
                        className="link"
                    >
                        Log in
                    </NavLink>}
                </li>
                <li>
                    <NavLink to="/profiel"
                             className="link"
                    >
                        Profiel
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar