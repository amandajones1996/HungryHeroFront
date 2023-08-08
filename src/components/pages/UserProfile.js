import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout } from "../../features/authSlice";

function UserProfile() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(logout());
    };

    return (
        <div>
            {isAuthenticated ? (
            <div>
                <p>Welcome, {user.username}!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            ) : (
            <p>Please log in to access this page.</p>
            )}
        </div>
    );
}
export default UserProfile; 