import React from "react";
import { Link } from "react-router-dom";
// import "../../Restaurant.css"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function Entry({ entry }) {
    return (
            <Col style={{ maxWidth: "80" }}>
                <Card style={{ border: "0", backgroundColor: "#000000" }}>
                    <Link to={`/restaurants/${entry.id}`} className="card-img" style={{ border: "0" }} class="d-flex align-items-center justify-content-center">
                        <Card.Img
                        variant="top"
                        src={require(`../../images/${entry.img}`)}
                        alt={`Attraction in ${entry.location}`}
                        style={{ height: '350px', objectFit: 'cover', padding: "30px", border: "0", maxWidth: "400px" }} 
                        className="square-image" 
                        />
                    </Link>
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title style={{ color: '#DB7093' }}>{entry.name}</Card.Title>
                        <Card.Text>{entry.location}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default Entry;


    // <div className="entryrestaurants">
        //     <div>
        //         <Link to={`/restaurants/${entry.id}`}>
        //             <img
        //             className="entryrestaurantsimg"
        //             id={`${entry.name}-img`}
        //             src={require(`../../images/${entry.img}`)}
        //             alt={`Attraction in ${entry.location}`}
        //             />
        //         </Link>
        //     </div>
        //     <div>
        //         <h3 className="name">{entry.name}</h3>
        //         <p className="destination">{entry.location}</p>
        //     </div>
        // </div>
        // );


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
