
import React from 'react'

import './Legend.css'

/*
 * COMPONENT: Legend
 * Legend list for pie chart
 * data with color value and name comes as props from donut or unequalDonut component
 */
function Legend(props) {
  return (
    <div className='legend'>
      <h3 className="leg__title">
      {props.legend[0] && props.legend[0].key === "Food Insecurity" 
        ? "Out of Total Population:" 
        : "Select data to display:"} 
      </h3>
      {props.legend.map((item, idx) => (
        <div className='leg__item' key={idx} onClick={() => props.onClickLegend(idx)}>
          {/* disable legend items whose item vaule is 0 */}
          {item.value != 0 ?
          <>
          <div className='leg__left'>
            <div className='leg__color' style={{ backgroundColor: item.color }}></div>
            <div className='leg__name'>{item.key}</div>
          </div>
          <div className='leg__rt'>{props.dataType === 'percentValue' ? `${item.value} (${item.percent}%)` 
                                                                      : props.dataType === 'percent' ? item.value + ' %' 
                                                                                                     : item.value}
          </div>
          </> 
          :
          <>
          <div className='leg__left'>
            <div className='leg__color' disabled="true" style={{ backgroundColor: "lightgrey" }}></div>
            <div className='leg__name' disabled="true" style={{ color: "lightgrey" }}>{item.key}</div>
          </div>
          <div className='leg__rt' disabled="true" style={{ color: "lightgrey" }}>{props.dataType === 'percentValue' ? `${item.value} (${item.percent}%)` 
                                                                      : props.dataType === 'percent' ? item.value + ' %' 
                                                                                                     : item.value}
          </div>
          </>
          }
        </div>
      ))}
    </div>
  )
}

export default Legend
