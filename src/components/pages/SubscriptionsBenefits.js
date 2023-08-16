import React from 'react'
import { Link } from 'react-router-dom';


function SubscriptionsBenefits() {
    return (
            <div className="subscription-benefits">
                <h2>How It Works</h2>
            <div className="benefit">
                <img src={require('../../images/box.jpg.png')} alt='calender' />
                <h3>CHANGE ANYTIME</h3>
                <p>Adjust to meet your schedule—skip, change, cancel, or pause your shipments anytime.</p>
            </div>
            <div className="benefit">
                {/* <img src=''> */}
                <h3>ALWAYS SHIPS FREE</h3>
                <p>As a subscriber, your orders always ships free. Plus, receive early access to new products, VIP events, and more.</p>
            </div>
            <div className="benefit">
                {/* <img  /> */}
                <h3>SIGNATURE ROTATING DISHES</h3>
                <p>Our restaurant partner's make daily ready to order in small batches and shipped to you directly from their kicthens.</p>
            </div>
            <div className="benefit">
                {/* <img  /> */}
                <h3>CAREFULLY CURATED</h3>
                <p>Our certified Q graders taste over 1000 menus yearly from around the world, to ensure you drink and eat only the best.</p>
            </div>
                <Link to="/">Shop our Subscriptions</Link>
            </div>
    )
}

export default SubscriptionsBenefits; 