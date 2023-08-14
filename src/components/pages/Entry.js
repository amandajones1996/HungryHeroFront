import React from "react";
import { Link } from "react-router-dom";

function Entry({ entry }) {

return (
<div className="entriesWrapper">
    <div className="entryContainer">
    <div className="entryrestaurants">
        <div>
        <div>
            <div>
            <Link to={`/restaurants/${entry.id}`}>
                <img className="entryrestaurantsimg" 
                    id={`${entry.name}-img`}
                    src={require(`../../images/${entry.img}`)}
                    alt={`Attraction in ${entry.location}`}
                />
            </Link>
            </div>
            <div></div>
        </div>
        </div>
    </div>

    <div className="infoContainer">
    <h2 className="name">{entry.name}</h2>
        <span className="destination">{entry.location}</span>
        {/* <p className="description">{entry.description}</p> */}
    </div>
    </div>
    <div></div>
</div>
);
}

export default Entry;