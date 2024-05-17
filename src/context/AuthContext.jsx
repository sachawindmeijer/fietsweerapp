import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import isTokenValid from "../helpers/isTokenValid.jsx";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();
    useEffect(() => {
        console.log("isauth", isAuth)
    }, [isAuth]);
    // MOUNTING EFFECT
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("auth", token)
        if (token && isTokenValid(token)) {
            const decoded = jwtDecode( token );

            void fetchUserData( decoded.sub, token, '/profile');
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    function login(token) {
        localStorage.setItem('token', token)
        const decoded= jwtDecode (token);
        void fetchUserData( decoded.sub, token, '/profile' );
    }

    async function fetchUserData(id, token, redirectUrl) {
        localStorage.setItem("token", token);
        // const decoded = isTokenValid(token);


        try {
            const data = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
                status: 'done',
            });
            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuthenticated: false,
                user: null,
                status: 'done',
            })
        }
    }
    //     {
    //         console.error("Ongeldig of verlopen token");
    //         toggleIsAuth({
    //             isAuthenticated: false,
    //             user: null,
    //             status: "done",
    //         })
    //     }
    // }

    function logout() {
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        localStorage.clear();
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const data = {
        loggedIn: isAuth.isAuth,
        login: login,
        logout: logout,
        user: isAuth.user
    };

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

