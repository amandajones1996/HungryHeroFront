import React from 'react'
import Entry from "./Entry"
import data from "../../data"

function Home() {
  const entryComponents = data.map( entry => {
    return <Entry key={entry.id} entry={entry} />
  })
  return (
    <div>
      <h1>Hungry Hero</h1>
      <br></br>
      <p>Where hunger is catered to you -- not the other way around</p>
      {entryComponents}
    </div>
)}

export default Home