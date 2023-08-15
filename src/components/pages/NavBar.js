import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated, logout } from "../../features/authSlice";
import userIcon from "../../images/userIcon.jpg"; 
import "../../NavBar.css"
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
        <Navbar  expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" as={Link} to="/">Hungry Hero</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >
                        <Nav.Link href="#home" as={Link} to="/subscriptionsbenefits">Explore our Subscriptions</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown id="basic-nav-dropdown" title="Become a Member">
                            {user ? (
                                <>
                                    <NavDropdown.Item href="#action/3.1" as={Link} to="/profile">Signed in as: {user.email}</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" onClick={handleLogout}>
                                    Sign Out
                                    </NavDropdown.Item>
                                </>
                            ) : (
                                <>
                                    <NavDropdown.Item href="#action/3.1" as={Link} to="/login">Log In</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" as={Link} to="/signup">
                                    Sign Up
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                    {/* Separated link */}
                                    </NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

