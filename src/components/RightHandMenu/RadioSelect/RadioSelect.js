import React, { useState } from 'react'

import './RadioSelect.css'

/*
 * COMPONENT: RadioSelect
 * options data comes in as props from RightHandMenu
 *  * Some data needs to be filtered here for pie chart (use redux slice as props needs to be hoisted)
 */
function RadioSelect(props) {
  const [selectFeat, setFeat] = useState(0)
  const radioClick = (idx) => {
    setFeat(idx)
  }

  return (
    <div className='radioSel'>
     {props.data ? (
        props.data.map((feature, idx) => (
          <label htmlFor={feature} key={idx}>
            <input type="radio" id={feature} name={feature} className='radioOpt' checked={selectFeat===idx} onChange={() => radioClick(idx)}></input>
            <h3 className='radioLabel'>{feature}</h3>
          </label>
        ))
      ): ''}
    </div>
  )
}

export default RadioSelect
