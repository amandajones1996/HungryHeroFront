import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


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
        // <div>
        //     <br></br>
        //     <h2 class="d-flex align-items-center justify-content-center" style={{ fontVariant: "all-small-caps", color: "#DB7093" }}>Set Up Delivery For Your Subscription</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Delivery Address:</label>
        //             <input type="text" value={dropoffAddress} onChange={(e) => setDropoffAddress(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Contact Phone Number:</label>
        //             <input type="text" value={dropoffPhoneNumber} onChange={(e) => setDropoffPhoneNumber(e.target.value)} />
        //         </div>
        //         <div>

        //         </div>
        //         <button type="submit">Create Delivery</button>
        //     </form>
        //     {showCancelButton && <button onClick={cancelDelivery}>Cancel Delivery</button>}
        //     {cancelResponse && <p>{cancelResponse}</p>}
        //     {deliveryResponse && (
        //     <div>
        //         <h3>Delivered through DoorDash: </h3>
        //         <p>Delivery Fee will be free of charge with your subscription.</p>
        //         {/* <p>External Delivery ID: {deliveryResponse.external_delivery_id}</p> */}
        //         {/* <p>Currency: {deliveryResponse.currency}</p> */}
        //         <p>Delivery Status: {deliveryResponse.delivery_status}</p>
        //         {/* Display other relevant properties */}
        //     </div>
        // )}
        // </div>





        <div
        className="custom-modal modal show"
        style={{ display: 'block', position: 'initial', color: '#DB7093' }}
        >
        <Modal.Dialog >
            <Modal.Header style={{ backgroundColor: '#ffffff' }}>
                <Modal.Title style={{ backgroundColor: '#ffffff', color: '#DB7093', fontVariant: "all-small-caps" }}>SET UP DELIVERY</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#ffffff' }}>
            <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Col style={{ backgroundColor: '#ffffff' }}>
                    <Form.Group style={{ backgroundColor: '#ffffff' }} className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: '#ffffff' }}>Delivery Address:</Form.Label>
                        <Form.Control placeholder='Enter Your Address, City, State, Zip' type="text" value={dropoffAddress} onChange={(e) => setDropoffAddress(e.target.value)}/>
                        <Form.Text className="text-muted" style={{ backgroundColor: '#ffffff' }}>
                        We'll never share your address with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col style={{ backgroundColor: '#ffffff' }}>
                    <Form.Group style={{ backgroundColor: '#ffffff' }} className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ backgroundColor: '#ffffff' }}>Contact Phone Number:</Form.Label>
                        <Form.Control  type="text" value={dropoffPhoneNumber} onChange={(e) => setDropoffPhoneNumber(e.target.value)} placeholder='Enter your phone number'/>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
            </Modal.Body>

            <Modal.Footer style={{ padding: '0px', backgroundColor: '#FFF5EE'  }} >
                <div class="d-flex align-items-center justify-content-center">
                    <Button  style={{ padding: '10px', margin: "0", backgroundColor: '#DB7093'  }} variant="secondary" type="submit" onClick={handleSubmit}>Create Delivery</Button>
                    </div>
                    <div style={{ backgroundColor: "ffffff" }}></div>
                    {showCancelButton && <Button onClick={cancelDelivery} style={{ backgroundColor: "ffffff", color: "D3D3D3" }}>Cancel Delivery</Button>}
                    {cancelResponse && <p>{cancelResponse}</p>}
                    {deliveryResponse && (
                    <div style={{ backgroundColor: "ffffff", padding: "30px" }} >
                        <h3 style={{  color: "#000000", fontVariant: "all-small-caps" }}>Delivered through DoorDash: </h3>
                        <p style={{  color: "#000000" }}>Delivery Fee will be free of charge with your subscription.</p>
                        {/* <p>External Delivery ID: {deliveryResponse.external_delivery_id}</p> */}
                        {/* <p>Currency: {deliveryResponse.currency}</p> */}
                        <p style={{ color: "#000000"}}>Delivery Status: {deliveryResponse.delivery_status}</p>
                        {/* Display other relevant properties */}
                    </div>
                )}
            </Modal.Footer>
        </Modal.Dialog>
    </div>
    );
};

export default Delivery

