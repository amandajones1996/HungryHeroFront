import './App.css';
import { Link, Route, Routes } from 'react-router-dom'; // <-- Make sure to import Navigate
import Restaurant from './components/pages/Restaurant';
import Home from './components/pages/Home';
// import UserProfile from "./components/pages/UserProfile";
import Login from "./components/pages/Login";
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "./features/authSlice";

function App() {
  // const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Restaurants">Restaurants</Link></li>
          <li><Link to="/login">Sign in</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restaurant />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}


export default App;
