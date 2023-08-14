import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout, updateUserOrders, setTotalOrders } from "../../features/authSlice"; 
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function UserProfile() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    // const userId = user ? user.userId : null;

    // console.log("userId:", user.userId)

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/'); 
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (user && user.userId){
        getUserOrders(user.userId)
        }
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
    const handleDeleteOrder = async (orderId) => {
        try {
            console.log(orderId)
            const response = await axios.delete(`http://127.0.0.1:8080/orders/${orderId}`);
            if (response.status === 204) {
            // Order deleted successfully, update the user's orders in the store
            const updatedOrders = user.orders.filter((order) => order.orderId !== orderId);
            dispatch(updateUserOrders(updatedOrders));
            dispatch(setTotalOrders(updatedOrders.length));
            }
        } catch (error) {
            console.error("Error deleting order:", error.message);
        }
    }
        const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated || !user) {
        // navigate("/");
        return null;
    }

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
                                <p>Subscription Number: {index + 1}</p> 
                                <p>Restaurant: {order.restaurant}</p>
                                <p>Food Order: {order.foodOrder}</p>
                                <p>Delivery Frequency: {order.deliveryFrequency}</p>
                                <p>Total Cost {order.deliveryFrequency}: ${order.totalAmount}</p>
                                <button onClick={() => handleDeleteOrder(order.orderId)}>Cancel Subscription</button>
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
