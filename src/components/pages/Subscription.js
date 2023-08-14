/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/authSlice";
import { selectRestaurant } from '../../features/restaurantSlice';
import { useNavigate } from 'react-router-dom';



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
            case 'weekly':
                amount = 50;
                break;
            case 'biweekly':
                amount = 50;
                break;
            case 'monthly':
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
        <div>
            hello
        <h2>Subscribe to a Plan</h2>
        {subscriptionResponse && <p>{subscriptionResponse}</p>}
        <form onSubmit={handleSubmit}>
            <p>Selected Price: {priceMapping[selectedFrequency]}</p>
            <select
            id="frequency"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <br />
            <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <label>Email:</label>
            <input
                type="email"
                value={email || (user && user.email ? user.email : '')}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <button type="submit">Subscribe</button>
        </form>
        </div>
    );
};

export default Subscription;
