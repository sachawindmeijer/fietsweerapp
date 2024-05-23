import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button.jsx";


function NavBar() {
    const {isAuth, logout} = useContext(AuthContext)
    // const {loggedIn, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">


            </Link>

            {isAuth ?
                <Button
                    //className=''
                    type="button"
                    onClick={logout}
                    text='logout'
                />
                :
                <div>
                    <Button
                        type="button"
                        onClick={() => navigate('/login')}
                        text='login'
                    />
                    <Button
                        type="button"
                        onClick={() => navigate('/registreren')}
                        text='Registreren'
                    />
                    <Button
                        type="button"
                        onClick={() => navigate('/')}
                        text='Home'
                    />
                </div>
            }
        </nav>
    );
}

export default NavBar;