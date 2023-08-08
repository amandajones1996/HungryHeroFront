import React from "react";


function Restaurant() {

    const restaurantData = {
        name: 'Concious Concentrate',
        description: 'Craft Coffee for Craft-Quality Drinks -- Anywhere',
        location: '788 W Marietta Atlanta, GA',
        contact: '+1 (503) 707 7931',
    };

    return (
        <div>
            <h1>{restaurantData.name}</h1>
            <p>{restaurantData.description}</p>
            <p>Location: {restaurantData.location}</p>
            <p>Contact: {restaurantData.contact}</p>
        </div>
    )
}

export default Restaurant