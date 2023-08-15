import './App.css';
import { Link, Route, Routes } from 'react-router-dom'; // <-- Make sure to import Navigate
import Restaurant from './components/pages/Restaurant';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import UserProfile from './components/pages/UserProfile';
import SignUp from './components/pages/SignUp';
import NavBar from './components/pages/NavBar';
import Delivery from './components/pages/Delivery';
// import Subscription from './components/pages/Subscription';
import SubscriptionsBenefits from './components/pages/SubscriptionsBenefits';


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/subscriptionsbenefits" element={<SubscriptionsBenefits />} />
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:restaurantId" element={<Restaurant />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/delivery" element={<Delivery />}/>
      </Routes>
    </>
  );
}

export default App;
