import React from 'react'

import './Legend.css'

function Legend(props) {
  return (
    <div className='legend'>
      {props.legend.map((item, idx) => (
        <div className='leg__item' key={idx}>
          <div className='leg__left'>
            <div className='leg__color' style={{ backgroundColor: item.color }}></div>
            <div className='leg__name'>{item.key}</div>
          </div>
          <div className='leg__rt'>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default Legend
