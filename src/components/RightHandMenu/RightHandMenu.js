import React, { useState } from 'react';

import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import RadioSelect from './RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
/**
 * COMPONENT: RightHandMenu
 */

const dataTypes = {
  'Poverty Rates' : {
    'desc': 'Text about poverty rates and the data and possibly the next year',
    'toggleSelect': ['Total', 'Children'],
    'radioSelect': null
  },
  'Food Insecurity' : {
    'desc': 'Text about food insecurity rates and the data and possibly the next year',
    'toggleSelect': ['Total', 'Children'],
    'radioSelect': {
      'Total' : ['2018', '2020 (Projected)'],
      'Children' : ['2018', '2020 (Projected)'] 
      }
  },
  'WIC Usage' : {
    'desc': 'Text about WIC usage data and the data and possibly the next year',
    'toggleSelect': ['Enrollment', 'Race'],
    'radioSelect': {
      'Enrollment' : null,
      'Race' : ['Women', 'Infants', 'Children'],
      }
  },
  'Census Data' : {
    'desc': 'Text about Census data and the data and possibly the next year',
    'toggleSelect': null,
    'radioSelect': null
  }
}

const RightHandMenu = () => {
  const mockProps = {'data':'WIC Usage', 'county': 'Champaign County'}

  const { data, county } = mockProps

  const initalToggleState = () => (dataTypes[data].toggleSelect ? dataTypes[data].toggleSelect[0] : null )

  const [toggSelected, setToggSelected] = useState(initalToggleState())

  return (
    <div>
      { county ? (
      <div className='rtMenu'>
        <h1 className='rt__title'>{data}</h1>
        <p className='rt__desc'>{dataTypes[data].desc}</p>
        <h3 className='rt__name'>{county}</h3>

        { dataTypes[data].toggleSelect ? (
          <div className='rt__toggleSelect'>
            <ToggleSelect data={dataTypes[data].toggleSelect} setToggSelected= {setToggSelected}/>
          </div>
        ) : ''}
        
        { dataTypes[data].radioSelect ? (
          <div className='rt__radioSelect'>
            <RadioSelect data={dataTypes[data].radioSelect[toggSelected]} />
          </div>
        ) : ''}

        <div className='rt__donut'>
          <Donut />
        </div>

        <div className='rt__footer'>
          <a alt='link to surce' href='#a' className='rt__link'>Link to source</a>  
        </div>
      </div>
    ) : (
      <div className='rtMenu'><p className='rt__noCounty'>Select a county to view {data}</p></div>
    )}
    </div> 
  )
}
export default RightHandMenu;
