import React from "react";
import { Link } from "react-router-dom";
import "../../Restaurant.css"

function Entry({ entry }) {
    return (
        <div className="entryrestaurants">
            <div>
                <Link to={`/restaurants/${entry.id}`}>
                    <img
                    className="entryrestaurantsimg"
                    id={`${entry.name}-img`}
                    src={require(`../../images/${entry.img}`)}
                    alt={`Attraction in ${entry.location}`}
                    />
                </Link>
            </div>
            <div>
                <h3 className="name">{entry.name}</h3>
                <p className="destination">{entry.location}</p>
            </div>
        </div>
        );

// return (
// <div className="container">
//     <div>
//     <div>
//         <div>
//         <div className="box">
//             <div>
//             <Link to={`/restaurants/${entry.id}`}>
//                 <img className="entryrestaurantsimg" 
//                     id={`${entry.name}-img`}
//                     src={require(`../../images/${entry.img}`)}
//                     alt={`Attraction in ${entry.location}`}
//                 />
//             </Link>
//             </div>
//             <div></div>
//         </div>
//         </div>
//     </div>

//     <div className="box">
//         <span className="name">{entry.name}</span>
//         <span className="destination">{entry.location}</span>
//         {/* <p className="description">{entry.description}</p> */}
//     </div>
//     </div>
//     <div></div>
// </div>
// );
}

export default Entry;


