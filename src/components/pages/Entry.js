import React from "react";
import { Link } from "react-router-dom";

function Entry({ entry }) {

return (
<div>
    <div className="entryContainer">
    <div>
        <div id={"carousel"} className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <Link to={`/restaurants/${entry.id}`}>
                <img 
                    id={`${entry.name}-img`}
                    src={require(`../../images/${entry.img}`)}
                    alt={`Attraction in ${entry.location}`}
                />
            </Link>
            </div>
            <div className="carousel-item"></div>
        </div>
        </div>
    </div>

    <div className="infoContainer">
        <span className="destination">{entry.location}</span>

        <p className="name">{entry.name}</p>
        <p className="description">{entry.description}</p>
    </div>
    </div>
    <div className="breaker"></div>
</div>
);
}

export default Entry;