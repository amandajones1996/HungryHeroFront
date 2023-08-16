import React from "react";
import { Link } from "react-router-dom";
// import "../../Restaurant.css"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function Entry({ entry }) {
    return (
            <Col xs={6} md={4} lg={3}>
                <Card style={{ border: "0" }}>
                    <Link to={`/restaurants/${entry.id}`}>
                        <Card.Img
                        variant="top"
                        src={require(`../../images/${entry.img}`)}
                        alt={`Attraction in ${entry.location}`}
                        style={{ height: '350px', objectFit: 'cover', padding: "20px", border: "0" }} 
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
