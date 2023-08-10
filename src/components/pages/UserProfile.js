import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout, updateUserOrders, setTotalOrders } from "../../features/authSlice"; 
import axios from "axios";
import { useEffect } from "react";



function UserProfile() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    // const userId = user ? user.userId : null;

    // console.log("userId:", user.userId)

    
    useEffect(() => {
        // Fetch user's orders if the user is logged in
        // if (user) {
        //     getUserOrders(user.userId);
        // }

        getUserOrders(user.userId)
    }, []);

    const getUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/users/${userId}`);
            const userWithOrders = response.data;
            console.log("usersOrders:", userWithOrders)
            // Dispatch the updateUserOrders action to update the user's orders in the store
            dispatch(updateUserOrders(userWithOrders.orders));

            // Set total orders in the Redux store
            dispatch(setTotalOrders(userWithOrders.orders.length));

        } catch (error) {
            console.error("Error fetching user orders:", error.message);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated || !user) {
        // Loading or not authenticated
        return <p>Please log in to access this page.</p>;
    }
    // console.log("users order", user.order)
    return (
        <div>
            <p>Welcome, {user.email}!</p>
            {user.orders && user.orders.length > 0 ? (
                <div>
                    <h3>Subscription History</h3>
                    <p>Active Subscriptions: {user.orders.length}</p>
                    <ul>
                        {user.orders.map((order, index) => (
                            <li key={order.orderId}>
                                <p>Order Number: {index + 1}</p> 
                                <p>Restaurant: {order.restaurant}</p>
                                <p>Food Order: {order.foodOrder}</p>
                                <p>Delivery Frequency: {order.deliveryFrequency}</p>
                                <p>Total Cost {order.deliveryFrequency}: ${order.totalAmount}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No order history available.</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}


export default UserProfile;
