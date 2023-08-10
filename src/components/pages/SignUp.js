import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState(null);
    

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8080/users", {
                email,
                password,
            });

            if (response.status === 201) {
                setSignupSuccess(true);
                console.log("User sign-up successful!");
                const response = await authenticateUser(email, password);
                dispatch(login({ email, userId: response.userId })); 
        
                setTimeout(() => {
                    // Navigate to the user profile or home page after a delay
                    navigate("/profile");
                }, 4000);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const authenticateUser = async (email, password) => {
        const response = await axios.post("http://127.0.0.1:8080/login", { email, password})

        if (!response.status === 200) throw new Error("Authentication failed");


        const responseJson = await response.data;
        console.log('Response JSON:', responseJson); // Add this line

        return responseJson;
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {signupSuccess ? (
                <p>Sign up successful! You are now logged in. Redirecting to your user profile..</p>
            ) : (
                <form onSubmit={handleSignup}>
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
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
}

export default SignUp;
