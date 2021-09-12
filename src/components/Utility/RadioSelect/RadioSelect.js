import React, { useState, useEffect } from 'react'

import './RadioSelect.css'

/*
 * COMPONENT: RadioSelect
 * options data comes in as props from RightHandMenu
 *  * Some data needs to be filtered here for pie chart (use redux slice as props needs to be hoisted)
 */
function RadioSelect(props) {
  const [selectFeat, setFeat] = useState(0)

  if(!props.handleChange) console.error('RadioSelect is missing an onChange in its props. Make sure this is on purpose.')

  const onOptionChange = (idx) => {
    setFeat(idx)
    if(!props.handleChange) {
      return
    }
    props.handleChange(idx)
  }

  useEffect(() => {
   //eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.data])

  const { alignment } = props

  return (
    <div className={`radioSel-${alignment}`}>
     {props.data ? (
        props.data.map((feature, idx) => {
          return <label htmlFor={feature} key={idx}>
            <input type="radio" 
                   id={feature} 
                   name={feature} 
                   className='radioOpt' 
                   checked={selectFeat===idx} 
                   onChange={() => {onOptionChange(idx)}}>
              </input>
            <h3 className='radioLabel'>{feature}</h3>
          </label>
 })
      ): ''}
    </div>
  )
}

export default RadioSelect
