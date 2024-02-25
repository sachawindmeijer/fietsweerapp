import { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import Register from './pages/register/Register.jsx';
import { AuthContext } from './context/AuthContext';

import SignOut from "./pages/signout/SignOut.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={<SignIn />}/>
                    <Route path="/registratie" element={<Register />}/>
                    <Route path="/loguit" element={<SignOut />}/>
                </Routes>

        </>
    );
}

export default App;