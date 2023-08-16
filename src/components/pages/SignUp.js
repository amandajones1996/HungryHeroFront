import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState(null);
     // State to track whether to show login or signup form
    const [showSignUp, setShowSignUp] = useState(false);

    // Function to toggle between login and signup forms
    const toggleForm = () => {
        setShowSignUp(!showSignUp);
        navigate("/login")
    };
    

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
        
                
            // Navigate to the user profile or home page after a delay
            navigate("/profile");
            
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
        <div
        className="custom-modal modal show"
        style={{ display: 'block', position: 'initial', color: '#DB7093' }}
    >
        <Modal.Dialog >
            <Modal.Header closeButton style={{ backgroundColor: '#ffffff' }}>
                <Modal.Title style={{ backgroundColor: '#ffffff', color: '#DB7093' }}>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#ffffff' }}>
            {signupSuccess ? (
                <p>Sign up successful! You are now logged in. Redirecting to your user profile..</p>
                ) : (
            <Form onClick={handleSignup}>
            <Row className="align-items-center">
                <Col style={{ backgroundColor: '#ffffff' }}>
                    <Form.Group style={{ backgroundColor: '#ffffff' }} className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: '#ffffff' }}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted" style={{ backgroundColor: '#ffffff' }}>
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col style={{ backgroundColor: '#ffffff' }}>
                    <Form.Group style={{ backgroundColor: '#ffffff' }} className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ backgroundColor: '#ffffff' }}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        )}
            </Modal.Body>

            <Modal.Footer style={{ padding: '0px', backgroundColor: '#ffffff'  }}>
                    <Button onClick={handleSignup} style={{ backgroundColor: '#DB7093'  }} variant="secondary" type="submit">Sign Up</Button>
                    <div></div>
                    <Button variant="secondary" onClick={toggleForm}>Switch to {showSignUp ? 'Sign Up' : 'Login'}
                    </Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>


        // <div>
        //     <h2>Sign Up</h2>
        //     {signupSuccess ? (
        //         <p>Sign up successful! You are now logged in. Redirecting to your user profile..</p>
        //     ) : (
        //         <form onSubmit={handleSignup}>
        //             <div>
        //                 <label>Email:</label>
        //                 <input
        //                     type="email"
        //                     placeholder="Enter your email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                 />
        //             </div>
        //             <div>
        //                 <label>Password:</label>
        //                 <input
        //                     type="password"
        //                     placeholder="Enter your password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //             </div>
        //             {error && <p style={{ color: "red" }}>{error}</p>}
        //             <button type="submit">Sign Up</button>
        //             <br></br>
        //             <button onClick={toggleForm}>Switch to {showSignUp ? 'Sign Up' : 'Login'}</button>
        //         </form>
        //     )}
        // </div>
    );
}

export default SignUp;
