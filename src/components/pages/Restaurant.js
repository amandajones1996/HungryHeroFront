import React from "react";
import data from "../../data";
import Subscription from "./Subscription";

function Restaurant() {
    const [restaurant, setRestaurant] = React.useState({
        name: '',
        description: '',
        location: '',
        menu: []
    })
    // console.log(restaurant)
    
    React.useEffect(() => {
        const restaurantId = window.location.pathname.split('/')[2]
        // console.log('name', restaurantId)
        const restaurantObj = data.filter(obj => obj.id === Number(restaurantId))[0]
        setRestaurant(restaurantObj)
    }, [])


    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>{restaurant.location}</p>
            <p>{restaurant.contact}</p>
            <Subscription />
            <h2>Menu</h2>
            <ul>
            {restaurant.menu.map((menuItem, index) => (
                <li key={index}>{menuItem}</li>
            ))}
            </ul>
        </div>
    )
}

export default Restaurant