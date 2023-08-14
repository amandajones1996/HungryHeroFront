import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout } from "../../features/authSlice";
import userIcon from "../../images/userIcon.jpg"; 
import "../../NavBar.css"
import { useNavigate } from "react-router-dom";




function NavBar() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };


    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <Link to="/">Hungry Hero</Link>
            </div>
            <div>
            <Link to="/restaurants">Explore our Restaurant Partners</Link>
            </div>
            <div className="navbar-profile">
                <div className="profile-icon" onClick={toggleDropdown}>
                    <img src={userIcon} alt="User Icon" className="user-icon" />
                </div>
                {dropdownVisible && (
                    <div className="dropdown">
                        {user ? (
                            <>
                                <div className="dropdown-item" onClick={closeDropdown}>
                                    <Link to="/profile">{user.email}</Link>
                                </div>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    Sign Out
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="dropdown-item">
                                    <Link to="/login">Login</Link>
                                </div>
                                <div className="dropdown-item">
                                    <Link to="/signup">Create Account</Link>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;

