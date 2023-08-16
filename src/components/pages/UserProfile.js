import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout, updateUserOrders, setTotalOrders } from "../../features/authSlice"; 
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';



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
            {user.orders && user.orders.length > 0 ? (
                <div>
                    <h3 class="d-flex align-items-center justify-content-center" style={{ fontWeight: "bolder"}}>Subscription History</h3>
                    <p class="d-flex align-items-center justify-content-center" style={{ color: '#DB7093', fontWeight: "bolder" }}>Welcome Back, {user.email}!</p>
                    <p class="d-flex align-items-center justify-content-center" style={{ fontWeight: "bold"}}>Active Subscriptions: {user.orders.length}</p>
                    {/* <ul>
                        {user.orders.map((order, index) => (
                            <li style={{ listStyleType: "none" }} key={order.orderId}>
                                <p>Subscription Number: {index + 1}</p> 
                                <p>Restaurant: {order.restaurant}</p>
                                <p>Food Order: {order.foodOrder}</p>
                                <p>Delivery Frequency: {order.deliveryFrequency}</p>
                                <p>Total Cost {order.deliveryFrequency}: ${order.totalAmount}</p>
                                <button onClick={() => handleDeleteOrder(order.orderId)}>Cancel Subscription</button>
                            </li>
                        ))}
                    </ul> */}
                    <br></br>
                    <div class="d-flex align-items-center justify-content-center">
                    <Accordion defaultActiveKey={['0']} alwaysOpen style={{ maxWidth: "500px" }}>
                
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Subscription Details</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: "#ffffff"}}>
                                    <ul style={{ backgroundColor: "#ffffff"}}>
                                        {user.orders.map((order, index) => (
                                            <li style={{ listStyleType: "none", backgroundColor: "#ffffff" }} key={order.orderId}>
                                                <p class="d-flex align-items-center justify-content-center" style={{ margin: "10px", backgroundColor: "#ffffff", fontWeight: "bolder" }} >Subscription Number: {index + 1}</p> 
                                                <p class="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#ffffff", fontWeight: "bold"}}>Restaurant: {order.restaurant}</p>
                                                <p style={{ backgroundColor: "#ffffff"}}>Food Order: {order.foodOrder}</p>
                                                <p style={{ backgroundColor: "#ffffff"}}>Delivery Frequency: {order.deliveryFrequency}</p>
                                                <p style={{ backgroundColor: "#ffffff"}}>Total Cost {order.deliveryFrequency}: ${order.totalAmount}</p>
                                                <Button variant="primary"  style={{ margin: "30px", backgroundColor: "#DB7093" }} onClick={() => handleDeleteOrder(order.orderId)}>Cancel Subscription</Button>
                                                <div
                                                style={{
                                                    width: "100%",      // Adjust the width as needed
                                                    height: "4px",     // Adjust the height to make it thicker
                                                    borderBottom: "2px solid #000000",
                                                    margin: "0 auto",  // Center the line horizontally
                                                    marginTop: "15px", // Adjust the top margin as needed
                                                    marginBottom: "15px", // Adjust the bottom margin as needed
                                                }}
                                                ></div>
                                            </li>
                                        ))}
                                    </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                </div>
            ) : (
                <p>No order history available.</p>
            )}
            <br></br>
            <div class="d-flex align-items-center justify-content-center">
                <Button variant="primary" style={{ backgroundColor: "#DB7093"}}  onClick={handleLogout}>Logout</Button>{' '}
            </div>
        </div>
    );
}


export default UserProfile;

