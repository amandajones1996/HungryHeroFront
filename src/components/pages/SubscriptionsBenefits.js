import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "../../SubscriptionBenefits.css"

function SubscriptionsBenefits() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
        };
    return (
        <div>
            <h2 class="d-flex align-items-center justify-content-center" style={{ color: '#DB7093', fontWeight: "bolder", padding: "0" }}>How It Works</h2>
            
            <Link class="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#ffffff", color: '#000000' }} to="/">Shop our Subscriptions</Link>
            
            <div className="subscription-benefits" style={{ backgroundColor: "#ffffff" }}>
                <br></br>
            <div className="benefit" style={{ backgroundColor: "#ffffff", margin: "50px" }} >
                <img src={require('../../images/istockphoto-811287040-612x612-2.jpg')} alt='calender'  style={{ height: '150px', padding: "20px", border: "0", backgroundColor: "#ffffff" }} />
                <h3 style={{ fontVariant: "all-small-caps", fontWeight: "lighter", color: '#DB7093', backgroundColor: "#ffffff" }}>CHANGE ANYTIME</h3>
                <p style={{ maxWidth: "200px", backgroundColor: "#ffffff", paddingBottom: "27px" }}>Adjust to meet your schedule—skip, change, cancel, or pause your shipments anytime.</p>
            </div>
            <div className="benefit" style={{ backgroundColor: "#ffffff", margin: "50px" }}>
                <img src={require('../../images/box.jpg.png')} alt='shipping box' style={{ height: '150px', padding: "20px", border: "0", backgroundColor: "#ffffff" }}/>
                <h3 style={{ fontVariant: "all-small-caps", fontWeight: "lighter", color: '#DB7093', backgroundColor: "#ffffff" }}>ALWAYS SHIPS FREE</h3>
                <p style={{ maxWidth: "200px", backgroundColor: "#ffffff" }}>As a subscriber, your orders always ships free. Plus, receive early access to new products, VIP events, and more.</p>
            </div>
            <div className="benefit" style={{ backgroundColor: "#ffffff", margin: "50px" }}>
            <img src={require('../../images/images-1.png')} alt='shipping box' style={{ height: '150px', objectFit: 'cover', padding: "20px", border: "0", backgroundColor: "#ffffff" }}/>
                <h3 style={{ fontVariant: "all-small-caps", fontWeight: "lighter", color: '#DB7093', backgroundColor: "#ffffff" }}>SIGNATURE ROTATING DISHES</h3>
                <p style={{ maxWidth: "200px", backgroundColor: "#ffffff" }}>Our restaurant partner's make daily ready to order in small batches and shipped to you directly from their kicthens.</p>
            </div>
            <div className="benefit" style={{ backgroundColor: "#ffffff", margin: "50px" }}>
            <img src={require('../../images/userIcon.jpg')} alt='shipping box' style={{ height: '150px', objectFit: 'cover', padding: "20px", border: "0", backgroundColor: "#ffffff" }}/>
                <h3 style={{ fontVariant: "all-small-caps", fontWeight: "lighter", color: '#DB7093', backgroundColor: "#ffffff" }}>CAREFULLY CURATED</h3>
                <p style={{ maxWidth: "200px", backgroundColor: "#ffffff" }}>Our certified Q graders taste over 1000 menus yearly from around the world, to ensure you drink and eat only the best.</p>
            </div>
            </div>
            </div>
    )
}

export default SubscriptionsBenefits; 