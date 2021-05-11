import React from 'react'

import './RadioSelect.css'

const options = {
  'food_insecurity': ['2018', '2020(Projected)'],
  'WIC': ['Women', 'Infants', 'Children']
}

function RadioSelect(props) {
  return (
    <div className='radioSel'>
        {options[props.data].map((feature, idx) => (
            <label htmlFor={feature} key={idx}>
              <input type="radio" id={feature} name={feature} className='radioOpt'></input>
              {feature}
            </label>
        ))}
    </div>
  )
}

export default RadioSelect
