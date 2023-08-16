import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

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
    <div
        className="custom-modal modal show"
        style={{ display: 'block', position: 'initial', color: '#DB7093' }}
    >
        <Modal.Dialog >
            <Modal.Header style={{ backgroundColor: '#ffffff' }}>
                <Modal.Title style={{ backgroundColor: '#ffffff', color: '#DB7093' }}>Log In</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#ffffff' }}>
            <Form onSubmit={handleLogin}>
            <Row className="align-items-center">
                <Col style={{ backgroundColor: '#ffffff' }}>
                    <Form.Group style={{ backgroundColor: '#ffffff' }} className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: '#ffffff' }}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
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
            </Modal.Body>

            <Modal.Footer style={{ padding: '0px', backgroundColor: '#ffffff'  }}>
                    <Button  style={{ padding: '10px', margin: "0", backgroundColor: '#DB7093'  }} variant="secondary" type="submit" onClick={handleLogin}>Submit</Button>
                    <div></div>
                    <Button variant="secondary" onClick={toggleForm}>Switch to {showSignUp ? 'Login' : 'Sign Up'}
                    </Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
    );
}

export default Login;

