import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";


function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            {/*<img src={logo} alt="logo"/>*/}
            <h3>
              Strand fiets weer
            </h3>
          </span>
            </Link>

            {isAuth ?
                <button
                    type="button"
                    onClick={logout}
                >
                    Log uit
                </button>
                :
                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                    >
                        Registreren
                    </button>
                </div>
            }
        </nav>
    );
}

export default NavBar;