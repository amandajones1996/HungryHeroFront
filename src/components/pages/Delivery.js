import React, { useState } from 'react'
import axios from 'axios';


function Delivery() {
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [dropoffPhoneNumber, setDropoffPhoneNumber] = useState('');
    const [deliveryResponse, setDeliveryResponse] = useState('');
    const [cancelResponse, setCancelResponse] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);

    const pickupAddress = "788 NW Marietta St Atlanta, GA 30318"
    const pickupPhoneNumber = "+15037077931"

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/create-quote', {
                dropoffAddress,
                dropoffPhoneNumber,
                pickupAddress,
                pickupPhoneNumber
            });
            
            console.log('Delivery created:', response.data);
        
            await acceptQuote(response.data.external_delivery_id);
            await createDelivery(dropoffAddress, dropoffPhoneNumber, pickupAddress, pickupPhoneNumber)

            setDropoffAddress('');
            setDropoffPhoneNumber('');
        
        } catch (error) {
            console.error('Error creating delivery:', error);
        
        }
    };


    const acceptQuote = async (externalDeliveryId) => {
        try {
            const acceptResponse = await axios.post('http://127.0.0.1:8080/accept-quote', {
                externalDeliveryId
            });

            console.log('Quote accepted:', acceptResponse.data);
            // Display a success message to the user
        } catch (error) {
            console.error('Error accepting quote:', error);
            // Display an error message to the user
        }
    };

    const createDelivery = async (dropoffAddress, dropoffPhoneNumber, pickupAddress, pickupPhoneNumber) => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/create-delivery', {
            dropoffAddress: dropoffAddress,
            dropoffPhoneNumber: dropoffPhoneNumber, 
            pickupAddress:  pickupAddress,
            pickupPhoneNumber: pickupPhoneNumber
            });
            console.log('delivery accepted:', Response);
            setDeliveryResponse(response.data);
            setShowCancelButton(true);
        } catch (error) {
            console.error('Error creating delivery:', error);
        }
    };

    const cancelDelivery = async (externalDeliveryId) => {
        try {
            const response = await axios.put('http://127.0.0.1:8080/cancel-delivery', {
                externalDeliveryId: deliveryResponse.external_delivery_id,
            });
            setCancelResponse(response.data);
            console.log("canceled delivery")

             // Reset state to hide the details section and clear deliveryResponse
        setShowCancelButton(false);
        setDeliveryResponse('');
        } catch (error) {
            console.error('Error canceling delivery:', error);
        }
    };

    return (
        <div>
            <h2>Set Up Delivery For Your Subscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Delivery Address:</label>
                    <input type="text" value={dropoffAddress} onChange={(e) => setDropoffAddress(e.target.value)} />
                </div>
                <div>
                    <label>Contact Phone Number:</label>
                    <input type="text" value={dropoffPhoneNumber} onChange={(e) => setDropoffPhoneNumber(e.target.value)} />
                </div>
                <div>

                </div>
                <button type="submit">Create Delivery</button>
            </form>
            {showCancelButton && <button onClick={cancelDelivery}>Cancel Delivery</button>}
            {cancelResponse && <p>{cancelResponse}</p>}
            {deliveryResponse && (
            <div>
                <h3>Delivery Information:</h3>
                <p>Delivery Fee will be free of charge with your subscription.</p>
                {/* <p>External Delivery ID: {deliveryResponse.external_delivery_id}</p> */}
                {/* <p>Currency: {deliveryResponse.currency}</p> */}
                <p>Delivery Status: {deliveryResponse.delivery_status}</p>
                {/* Display other relevant properties */}
            </div>
        )}
        </div>
    );
};

export default Delivery