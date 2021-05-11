import React, { useState } from 'react'

import './RadioSelect.css'

const options = {
  'food_insecurity': ['2018', '2020(Projected)'],
  'WIC': ['Women', 'Infants', 'Children']
}

function RadioSelect(props) {
  const [selectFeat, setFeat] = useState(0)
  const radioClick = (idx) => {
    setFeat(idx)
  }

  return (
    <div className='radioSel'>
        {options[props.data].map((feature, idx) => (
            <label htmlFor={feature} key={idx}>
              <input type="radio" id={feature} name={feature} className='radioOpt' checked={selectFeat===idx} onClick={() => radioClick(idx)}></input>
              <h3 className='radioLabel'>{feature}</h3>
            </label>
        ))}
    </div>
  )
}

export default RadioSelect
