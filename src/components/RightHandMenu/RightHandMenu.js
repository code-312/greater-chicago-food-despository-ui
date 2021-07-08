import React, { useState } from 'react'

import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
import UnequalDonut from './DonutChart/UnEqualDonut/UnequalDonut'

// Static Content to show in right hand menu
const dataTypes = {
  Poverty : {
    title: 'Poverty Rates',
    desc: 'Text about poverty rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    radioSelect: null
  },
  Food_Insecurity : {
    title: 'Food Insecurity',
    desc: 'Text about food insecurity rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    radioSelect: {
      Total : ['2018', '2020'],
      Children : ['2018', '2020'] 
    }
  },
  WIC : {
    title: 'WIC Usage',
    desc: 'Text about WIC usage data and the data and possibly the next year',
    toggleSelect: ['Enrollment', 'Race'],
    radioSelect: {
      Enrollment : null,
      Race : ['Women', 'Infants', 'Children'],
      }
  },
  Census : {
    title: 'Census Data',
    desc: 'Text about Census data and the data and possibly the next year',
    toggleSelect: null,
    radioSelect: null
  }
}

/*
 * COMPONENT: RightHandMenu
 */

const RightHandMenu = () => {
  // This data should come in as props/slice into this component
  // change 'data' for different views of menu
  // const mockProps = {data:'Food_Insecurity', county: ''}
  // const mockProps = {data:'Food_Insecurity', county: 'Champaign County'}
  // const mockProps = {data:'WIC', county: 'Champaign County'}
  // const mockProps = {data:'Poverty', county: 'Champaign County'}
  const mockProps = {data:'Census', county: 'Champaign County'}



  const { data, county } = mockProps

  // To keep track of which toggleSelect option is selected, so that respective radioSelect Options can be rendered
  const initalToggleState = () => (dataTypes[data].toggleSelect ? dataTypes[data].toggleSelect[0] : null )

  const [toggSelected, setToggSelected] = useState(initalToggleState())

  return (
    <div>
      { county ? (
      <div className='rtMenu'>
        <div className='rtBody'>
          <h1 className='rt__title'>{dataTypes[data].title}</h1>
          <p className='rt__desc'>{dataTypes[data].desc}</p>
          <h3 className='rt__name'>{county}</h3>

          { dataTypes[data].toggleSelect ? (
            <div className='rt__toggleSelect'>
              <ToggleSelect data={dataTypes[data].toggleSelect} setToggSelected= {setToggSelected}/>
            </div>
          ) : ''}
          
          { dataTypes[data].radioSelect ? (
            <div className='rt__radioSelect'>
              <RadioSelect data={dataTypes[data].radioSelect[toggSelected]} handleChange={(idx) => console.log(idx)} alignment={'row'}/>
            </div>
          ) : ''}

          {/* WIC data and Census Data has race type pie chart; others have a different pie chart */}
          <div className='rt__donut'>
            {(data === 'WIC' || data === 'Census') ? <Donut /> : <UnequalDonut />}    
          </div>
        </div>
        <div className='rt__footer'>
          <a alt='link to surce' href='#a' className='rt__link'>Link to source</a>  
        </div>
      </div>
    ) : (
      <div className='rtMenu noCounty'><p className='rt__noCounty'>Select a county to view {data}</p></div>
    )}
    </div> 
  )
}
export default RightHandMenu
