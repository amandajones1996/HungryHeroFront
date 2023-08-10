import './App.css';
import { Link, Route, Routes } from 'react-router-dom'; // <-- Make sure to import Navigate
import Restaurant from './components/pages/Restaurant';
import Home from './components/pages/Home';
// import UserProfile from "./components/pages/UserProfile";
import Login from "./components/pages/Login";
import UserProfile from './components/pages/UserProfile';
import SignUp from './components/pages/SignUp';
import NavBar from './components/pages/NavBar';
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "./features/authSlice";

function App() {
  // const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
    <NavBar />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Restaurants">Explore our Restaurant Partners</Link></li>
          {/* <li><Link to="/login">Sign in</Link></li>
          <li><Link to="/signup">Sign Up</Link></li> */}
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restaurant />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}


export default App;
