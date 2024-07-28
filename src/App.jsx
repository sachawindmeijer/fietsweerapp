import {Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import Register from './pages/register/Register.jsx';
import SignOut from "./pages/signout/SignOut.jsx";
import Profile from "./pages/profile/Profile.jsx";
import "./App.css"
import Footer from "./components/footer/Footer.jsx";


function App() {

    return (
        <div className="app">
            {/*<div className="content">*/}
                <Routes>

                    <Route path="/" className="nav-button" element={<Home/>}/>
                    <Route path="/profiel" className="nav-button" element={<Profile/>}/>
                    <Route path="/login" className="nav-button" element={<SignIn/>}/>
                    <Route path="/registreren" className="nav-button" element={<Register/>}/>
                    <Route path="/loguit" className="nav-button" element={<SignOut/>}/>

                </Routes>
            {/*</div>*/}
            {/*<Footer/>*/}

        </div>
    );
}

export default App;