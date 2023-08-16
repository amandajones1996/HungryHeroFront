import React from 'react'
import Entry from "./Entry"
import data from "../../data"
import "../../Home.css"
import Row from 'react-bootstrap/Row'

function Home() {
  const entryComponents = data.map( entry => {
    return <Entry key={entry.id} entry={entry} />
  })
  console.log(entryComponents)
  return (
    <div>
      <h1 className='homeheaders' style={{ fontWeight: "bolder" }}>Hungry Hero</h1>
      <h2 className='homeheaders' id='motto'>Where Hunger is Catered to You -- Not The Other Way Around</h2>
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
      <div className='entries'> 
        {entryComponents}
      </div>
    </div>
)};

export default Home
