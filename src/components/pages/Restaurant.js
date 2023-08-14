import React, { useEffect } from "react";
import data from "../../data";
import Subscription from "./Subscription";
import "../../Restaurant.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRestaurant, getRestaurantData } from "../../features/restaurantSlice";


function Restaurant() {
    // const [restaurant, setRestaurant] = React.useState({
    //     name: '',
    //     description: '',
    //     location: '',
    //     menu: []
    // })
    // console.log(restaurant)
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const restaurant = useSelector((state) => state.restaurant.restaurantData);

    // React.useEffect(() => {
    //     const restaurantId = window.location.pathname.split('/')[2]
    //     // console.log('name', restaurantId)
    //     const restaurantObj = data.filter(obj => obj.id === Number(restaurantId))[0]
    //     setRestaurant(restaurantObj)
    // }, [])
    // useEffect(() => {
    //     const restaurantObj = data.find(obj => obj.id === Number(restaurantId));
    //     console.log("restaurant selected", restaurantObj)
    //     if (restaurantObj) {
    //         dispatch(loadRestaurant({ restaurantId, restaurantData: restaurantObj }));
    //     }
    // }, [dispatch, restaurantId]);

    useEffect(() => {
        dispatch(getRestaurantData(restaurantId));
    }, [])

    console.log("restaurant state", restaurant)
    if (!restaurant) {
        return <div>Loading...</div>; 
    }
    console.log("restaurant redux state:", restaurant)

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>{restaurant.location}</p>
            {/* <p>{restaurant.contact}</p> */}
            <h2>What You'll Get</h2>
            <ul>
            {restaurant.menu.map((menuItem, index) => (
                <li key={index}>{menuItem}</li>
            ))}
            </ul>
            <Subscription />
        </div>
    )
}

export default Restaurant