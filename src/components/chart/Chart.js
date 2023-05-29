import React from 'react'
import CasesLineGraph from './LineGraph'
import CovidMap from './CovidMap'
import './chart.css'

function Chart() {
  return (
<div className='charts'>
<div className='flactuations'>
<CasesLineGraph/>
</div>
<div className='map'><CovidMap/></div>

 </div>
  )
}

export default Chart