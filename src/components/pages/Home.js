import React from 'react'
import Entry from "./Entry"
import data from "../../data"
import "../../Home.css"

function Home() {
  const entryComponents = data.map( entry => {
    return <Entry key={entry.id} entry={entry} />
  })
  return (
    <div>
      <h1 className='homeheaders'>Hungry Hero</h1>
      <h2 className='homeheaders'>Where Hunger is Catered to You -- Not The Other Way Around</h2>
      <br></br>
      <div>
        {entryComponents}
      </div>
    </div>
)}

export default Home