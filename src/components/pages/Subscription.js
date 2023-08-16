/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/authSlice";
import { selectRestaurant } from '../../features/restaurantSlice';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';



const Subscription = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currency, setCurrency] = useState('USD'); 
    const [setupIntentId, setSetupIntentId] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState('monthly')
    const user = useSelector(state => state.auth.user);
    const [subscriptionResponse, setSubscriptionResponse] = useState("");
    const restaurant = useSelector(state => state.restaurant.restaurantData);
    
    const priceMapping = {
        weekly: '$50.00',
        biweekly: '$50.00',
        monthly: '$50.00',
    };

    console.log("freg",selectedFrequency)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        } else { 

        
        const customerInfo = await createStripeCustomer({ email, name });

        
        console.log('Customer object:', customerInfo);
        console.log('Customer id:', customerInfo.customerId);

        if (customerInfo && customerInfo.customerId) {

            const setupIntentInfo = await createSetupIntent(customerInfo.customerId);
            if (setupIntentInfo && setupIntentInfo.setupIntentId) {
                setSetupIntentId(setupIntentInfo.setupIntentId);
            }
            console.log("setupIntentId", setupIntentId)

            const paymentIntentInfo = await createPaymentIntent(customerInfo.customerId, selectedFrequency, currency);
            if (paymentIntentInfo) {
                console.log('PaymentIntent created:', paymentIntentInfo);
            }
        

            const stripeCheckout = window.open("https://buy.stripe.com/test_bIY9Cgctv4C3goM6oo", "_blank");
            
            try {
            const subscriptionInfo = await getCustomerPaymentId(customerInfo.customerId)
            if (!subscriptionInfo) {
                setSubscriptionResponse("Subscription successful!");
                } else {
                setSubscriptionResponse("Error subscribing. Please try again.");
                }
            } catch (error) {
                console.error("Error subscribing:", error);
                setSubscriptionResponse("Error subscribing. Please try again.");
            }
            console.log('Restaurant:', restaurant);
            console.log('Menu:', restaurant.menu);
            const orderResponse = await axios.post("http://127.0.0.1:8080/orders", {
                restaurant: restaurant.name,
                foodOrder: restaurant.menu.join(', '),
                deliveryFrequency: selectedFrequency,
                totalAmount: 50.0, 
                userId: user.userId, 
            });
            
            console.log("POST new orders response", orderResponse);
    
            if (orderResponse.status === 201) {
                navigate('/delivery'); 
                }
            }
        }
        setName('');
        setEmail('');
    };

    const createStripeCustomer = async (customerData) => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/stripe/createCustomer", {customerData});
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            return null;
        }
    };

    const createSetupIntent = async (customerId) => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/stripe/create-setup-intent", {customerId});
            return response.data;
        } catch (error) {
            console.error('Error creating SetupIntent:', error);
            return null;
        }
    };

    const createPaymentIntent = async (customerId, amount, currency ) => {
        try {
            let amount = 0;
            switch (selectedFrequency) {
            case 'Weekly':
                amount = 50;
                break;
            case 'Biweekly':
                amount = 50;
                break;
            case 'Monthly':
                amount = 50;
                break;
            default:
                break;
            }

            const response = await axios.post("http://127.0.0.1:8080/stripe/create-payment-intent", { customerId, amount, currency });
            return response.data;
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
            return null;
        }

    };
    
    const getCustomerPaymentId = async (customerId) => {
        try {
            console.log(customerId)
            const response = await axios.get(`http://127.0.0.1:8080/stripe/get-customer/${customerId}`);
            const paymentMethodId = response.data;
            console.log(paymentMethodId)
            if (paymentMethodId) {
                
                console.log('Default Payment Method ID:', paymentMethodId);

                // navigate("/profile");
            } else {
                // console.log('No default payment method found.');
                console.log(response)
            }
        } catch (error) {
            console.error('Error fetching default payment method:', error);
        }
    };

    const handleStripeCheckout = async (customerId) => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/stripe/create-subscription", {
                customerId: customerId, 
                items: ['price_1NeJB7LWbHJdhU8K9NrIU110'], 
                defaultPaymentMethod: 'pm_1NeOF8LWbHJdhU8KceF6qJ4q' 
            });

            console.log(response.data); 

    
            if (response.status === 200) {
                navigate('/delivery'); 
            }
        } catch (error) {
            console.error('Error creating subscription:', error);
            
        }
    };




    return (
        <Accordion  defaultActiveKey="0" style={{ width: "40vw", padding: "50px", color: '#DB7093' }}>
        <Accordion.Item eventKey="0">
            <div style={{ background: '#DB7093', color: '#DB7093', margin: "0" }}>
            <Accordion.Header style={{ background: '#DB7093', color: '#DB7093', padding: "0" }}>Subscribe</Accordion.Header>
            </div>
            <Accordion.Body class="d-flex align-items-center justify-content-center"  style={{ backgroundColor: '#ffffff' }}>
        {subscriptionResponse && <p>{subscriptionResponse}</p>}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', color:'#DB7093' }}>
            <p style={{ backgroundColor: '#ffffff' }}>Cost {selectedFrequency}: {priceMapping[selectedFrequency]}</p>
            {/* <Dropdown style={{backgroundColor: '#ffffff'}}>
            <p style={{ backgroundColor: '#ffffff' }}>Cost {selectedFrequency}: {priceMapping[selectedFrequency]}</p>
                <Dropdown.Toggle variant="success" id="dropdown-basic"
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value)}
                style={{ backgroundColor: '#DB7093', color:'#ffffff' }}>Subscription Frequency</Dropdown.Toggle> */}
            <select
            id="frequency"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            style={{ backgroundColor: '#DB7093', color:'#ffffff' }}
            >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
            </select>

{/* 
                <Dropdown.Menu  id="frequency"
                value={selectedFrequency}
                onSelect={(e) => console.log("hi")}
                style={{ backgroundColor: '#DB7093', color:'#ffffff' }}>
                    <Dropdown.Item href="#/action-1" value="Weekly"  onSelect={(e) => setSelectedFrequency(e.target.value)}>Weekly</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" value="Biweekly">Biweekly</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" value="Monthly">Monthly</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}

            <br />
            <br></br>
            <div style={{ backgroundColor: '#ffffff', color:'#DB7093'}}>
            <label style={{ backgroundColor: '#ffffff' }}>Name: </label>
            <input style={{ backgroundColor: '#ffffff' }} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name'/>
            </div>
            <br></br>
            <div style={{ backgroundColor: '#ffffff' }}>
            <label style={{ backgroundColor: '#ffffff' }}>Email: </label>
            <input
                type="email"
                value={email || (user && user.email ? user.email : '')}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#ffffff' }}
                placeholder='Enter Your Email'
            />
            </div>
            <br></br>
            <Button variant="primary" style={{ backgroundColor:'#DB7093', color: '#ffffff', border: "10" }} type="submit">Subscribe</Button>
        </form>
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    );
};

export default Subscription;
