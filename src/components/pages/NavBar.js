import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout } from "../../features/authSlice";
import userIcon from "../../images/userIcon.jpg"; 
import "../../NavBar.css"



function NavBar() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Your Profile</div>
            <div className="navbar-profile">
                <div className="profile-icon" onClick={toggleDropdown}>
                    <img src={userIcon} alt="User Icon" className="user-icon" />
                </div>
                {dropdownVisible && (
                    <div className="dropdown">
                        <div className="dropdown-item" onClick={closeDropdown}>
                            <Link to="/profile">User Profile</Link>
                        </div>
                        <div className="dropdown-item" onClick={handleLogout}>
                            Sign Out
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;

