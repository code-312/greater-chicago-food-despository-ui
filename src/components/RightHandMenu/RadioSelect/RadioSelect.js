import React from 'react'

const options = {
  'food_insecurity': ['2018', '2020(Projected)'],
  'WIC': ['Women', 'Infants', 'Children']
}

function RadioSelect() {
  return (
    <div className='radioSel'>
       <label htmlFor="overall-poverty">
          Overall Poverty
          <input type="checkbox"  id="overall-poverty" name="overall-poverty" className="toggle" defaultChecked></input>
        </label>
    </div>
  )
}

export default RadioSelect
