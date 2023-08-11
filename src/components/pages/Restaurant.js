import React from "react";
import data from "../../data";

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

    // const restaurantData = {
    //     name: 'Concious Concentrate',
    //     description: 'Craft Coffee for Craft-Quality Drinks -- Anywhere',
    //     location: '788 W Marietta Atlanta, GA',
    //     contact: '+1 (503) 707 7931',
    // };

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>{restaurant.location}</p>
            <p>{restaurant.contact}</p>
            {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script> */}
            <stripe-pricing-table pricing-table-id="prctbl_1NdzeuLWbHJdhU8KMH4UftmY"
            publishable-key="pk_test_51NDIY0LWbHJdhU8KCAfdTqqw1vQ86Ct5QeI3wAtqg67kEQVjqq2nA59CMipNGi6a2EbJ2ZVA4ImUM8xyEK2yYRxj00ddgV9pwX">
            </stripe-pricing-table>
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