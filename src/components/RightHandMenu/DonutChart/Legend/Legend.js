
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
      {props.legend.map((item, idx) => (
        <div className='leg__item' key={idx}>
          <div className='leg__left'>
            <div className='leg__color' style={{ backgroundColor: item.color }}></div>
            <div className='leg__name'>{item.key}</div>
          </div>
          <div className='leg__rt'>{props.dataType === 'percentValue' ? `${item.value} (${item.percent}%)` 
                                                                      : props.dataType === 'percent' ? item.value + ' %' 
                                                                                                     : item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Legend
