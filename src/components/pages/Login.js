import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

     // State to track whether to show login or signup form
    const [showSignUp, setShowSignUp] = useState(false);

    // Function to toggle between login and signup forms
    const toggleForm = () => {
        setShowSignUp(!showSignUp);
        navigate("/signup")
    };
    
    const authenticateUser = async (email, password) => {
        const response = await axios.post("http://127.0.0.1:8080/login", { email, password})

        if (!response.status === 200) throw new Error("Authentication failed");


        const responseJson = await response.data;
        console.log('Response JSON:', responseJson); // Add this line

        return responseJson;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await authenticateUser(email, password);
            console.log(response.userId)
    
            if (response.authenticated) {
                // dispatch(login({ response })); 
                dispatch(login({ email, userId: response.userId })); 
                // dispatch(updateUserId(response.userId));

                navigate("/profile");
    
                // Reset form fields
                setEmail("");
                setPassword("");
            } else {
                console.error("Authentication failed");
                // Handle authentication error
            }
        } catch (error) {
            console.error("Authentication failed:", error.message);
            // Handle authentication error
        }
    };
    

    return (
    <div>
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
        <div>
            <label>Email:</label>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label>Password:</label>
            <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button onClick={handleLogin} type="submit">Login</button>
        <br></br>
        <button onClick={toggleForm}>Switch to {showSignUp ? 'Login' : 'Sign Up'}</button>
        </form>
    </div>
    );
}

export default Login;
