import './App.css';
import { Link, Route, Routes } from 'react-router-dom'; // <-- Make sure to import Navigate
import Restaurant from './components/pages/Restaurant';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import UserProfile from './components/pages/UserProfile';
import SignUp from './components/pages/SignUp';
import NavBar from './components/pages/NavBar';
import Delivery from './components/pages/Delivery';


function App() {

  return (
    <>
      <NavBar />
      <Link to="/delivery">delivery</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:restaurantId" element={<Restaurant />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/delivery" element={<Delivery />}/>
      </Routes>

      <div>
        {/* <Home /> */}
        <nav>
          {/* <ul>{entryComponents}</ul> */}
        </nav>
      </div>
    </>
  );
}

export default App;
