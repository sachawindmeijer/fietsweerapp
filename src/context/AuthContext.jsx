import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import isTokenValid from "../helpers/isTokenValid.jsx";

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
  const [ isAuth, toggleIsAuth ] = useState( {
    isAuthenticated: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  // MOUNTING EFFECT
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      void login(token);
    } else {
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: "done",
      });
    }
  }, []);

  async function login(token) {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);

    if (decodedToken) {
      localStorage.setItem('token', token);


      try {
        const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
        );

        toggleIsAuth({
          ...isAuth,
          isAuthenticated: true,
          user: {
            username: response.data.username,
            email: response.data.email,
          },
          status: 'done',
        });
        navigate('/profile');
      } catch (e) {
        console.error(e);
        toggleIsAuth({
          isAuthenticated: false,
          user: null,
          status: 'done',
        })
      }
    } else {
      console.error("Ongeldig of verlopen token");
      toggleIsAuth({
        isAuthenticated: false,
        user: null,
        status: "done",
      })
    }
  }
  function logout() {
    localStorage.clear();
    toggleIsAuth( {
      isAuth: false,
      user: null,
      status: 'done',
    } );

    console.log( 'Gebruiker is uitgelogd!' );
    navigate( '/' );
  }
  const data = {
    ...isAuth,
    login: login,
    logout: logout,
    navigate: navigate,
  };

  return (
      <AuthContext.Provider value={ data }>
        { isAuth.status === 'done' ? children : <p>Loading...</p> }
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;