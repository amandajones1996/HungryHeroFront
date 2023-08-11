import './App.css';
import { Link, Route, Routes } from 'react-router-dom'; // <-- Make sure to import Navigate
import Restaurant from './components/pages/Restaurant';
import Home from './components/pages/Home';
// import UserProfile from "./components/pages/UserProfile";
import Login from "./components/pages/Login";
import UserProfile from './components/pages/UserProfile';
import SignUp from './components/pages/SignUp';
import NavBar from './components/pages/NavBar';
// import data from "./data"
// import Entry from "./components/pages/Entry"

// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "./features/authSlice";

function App() {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const entryComponents = data.map( entry => {
  //   return <Entry key={entry.id} entry={entry} />
  // })
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:name" element={<Restaurant />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
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
