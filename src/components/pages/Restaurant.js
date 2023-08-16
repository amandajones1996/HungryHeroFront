import React, { useEffect } from "react";
import data from "../../data";
import Subscription from "./Subscription";
import "../../Restaurant.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRestaurant, getRestaurantData } from "../../features/restaurantSlice";
import Image from 'react-bootstrap/Image';


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
            <div class="d-flex align-items-center justify-content-center">
                <Image src={require(`../../images/${restaurant.img2}`)}
                    alt={`Attraction in ${restaurant.location}`} style={{ width: "900px", height: "350px", padding: "50px", justifyContent: "center" }}/>
            </div>
            <h1 class="d-flex align-items-center justify-content-center" style={{ color: '#DB7093', fontWeight: "bold" }}>{restaurant.name}</h1>
            <div class="d-flex align-items-center justify-content-center" >
                <p class="d-flex align-items-center justify-content-center" style={{ padding: "0 30px", maxWidth: "800px" }}>{restaurant.description}</p>
            </div>
            <p class="d-flex align-items-center justify-content-center" style={{ fontWeight: "bold", fontStyle: "italic"}}>{restaurant.location}</p>
            <div class="d-flex align-items-center justify-content-center">
                <Subscription />
            </div>
            <h2 class="d-flex align-items-center justify-content-center" 
                    style={{ backgroundColor: '#FFF5EE', color: "#000000", fontSize: "17px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                    What You'll Get
            </h2>
            <div
            style={{
                width: "80%",      // Adjust the width as needed
                height: "4px",     // Adjust the height to make it thicker
                borderBottom: "2px solid #000000",
                margin: "0 auto",  // Center the line horizontally
                marginTop: "15px", // Adjust the top margin as needed
                marginBottom: "15px", // Adjust the bottom margin as needed
            }}
            ></div>
            {/* <h2 class="d-flex align-items-center justify-content-center" style={{ color: '#DB7093' }}>What You'll Get</h2>
            <div class="d-flex align-items-center justify-content-center" >
                <ul>
                    {restaurant.menu.map((menuItem, index) => (
                        <li key={index}>{menuItem}</li>
                    ))}
                </ul>
            </div> */}
            <div class="d-flex align-items-center justify-content-center">
            <div id="accordionExample">
            <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                {/* <button class="accordion-button d-flex align-items-center justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                    style={{ backgroundColor: '#FFF5EE', color: "#000000", fontSize: "17px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                    What You'll Get
                </button> */}
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" style={{ backgroundColor: '#FFF5EE', color: "#000000", fontSize: "15px", lineHeight: "28px", letterSpacing: "1px", padding: "20px" }}>
                
                                {restaurant.menu.map((menuItem, index) => (
                                    <li style={{ backgroundColor:'#FFF5EE', listStyleType: "none" }} key={index}>{menuItem}</li>
                                ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Restaurant

