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
  
  if(!props.handleChange) console.error('RadioSelect is missing an onChange in its props. Make sure this is on purpose.');

  const handleChange = (idx) => {
    if(!props.handleChange) {
      return
    };
    props.handleChange(idx);
  }

  const { alignment } = props; 

  return (
    <div className={`radioSel-${alignment}`}>
     {props.data ? (
        props.data.map((feature, idx) => (
          <label htmlFor={feature} key={idx}>
            <input type="radio" id={feature} name={feature} className='radioOpt' checked={selectFeat===idx} onClick={() => radioClick(idx)} onChange={() => handleChange(idx)}></input>
            <h3 className='radioLabel'>{feature}</h3>
          </label>
        ))
      ): ''}
    </div>
  )
}

export default RadioSelect
