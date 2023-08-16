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
      <h1 className='homeheaders'>Hungry Hero</h1>
      <h2 className='homeheaders' id='motto'>Where Hunger is Catered to You -- Not The Other Way Around</h2>
      <div className='entries'> 
        {entryComponents}
      </div>
    </div>
)};

export default Home
