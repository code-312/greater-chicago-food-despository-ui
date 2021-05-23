import React, { useState } from 'react'
import { useSelector } from 'react-redux';


import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
import UnequalDonut from './DonutChart/UnEqualDonut/UnequalDonut'
import {featureDataFilter} from '../Utility/dataFilter_Pie'

// Static Content to show in right hand menu
const dataTypes = {
  poverty_data : {
    title: 'Poverty Rates',
    desc: 'Text about poverty rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    toggleSelectKeys: ['poverty_population_poverty', 'poverty_population_poverty_child'],
    toggleLegendLabel: ['Overall Poverty', 'Child Poverty'],
    radioSelect: null
  },
  insecurity_data : {
    title: 'Food Insecurity',
    desc: 'Text about food insecurity rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    radioSelect: {
      Total : ['2018', '2020'],
      Children : ['2018', '2020'] 
    }
  },
  wic : {
    title: 'WIC Usage',
    desc: 'Text about WIC usage data and the data and possibly the next year',
    toggleSelect: ['Enrollment', 'Race'],
    radioSelect: {
      Enrollment : null,
      Race : ['Women', 'Infants', 'Children'],
      }
  },
  race_data : {
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

  // const mockProps = {data:'insecurity_data', county: 'Champaign County'}
  // const mockProps = {data:'wic', county: 'Champaign County'}
  const mockProps = {data:'poverty_data'}
  // const mockProps = {data:'race_data', county: 'Champaign County'}



  const { data } = mockProps

  // get all County features data
  const countyData = useSelector(state => state.county_data.countyData)
  const selectFeat = useSelector(state => state.selectFeat)

  const { selectCounty, filterFeat } = selectFeat

  const pieData = featureDataFilter(countyData, selectFeat )

  console.log('pieData', pieData)

  // To keep track of which toggleSelect option is selected, so that respective radioSelect Options can be rendered
  // const initalToggleState = () => (dataTypes[data].toggleSelect ? dataTypes[data].toggleSelect[0] : null )
  const initalToggleState = () => (dataTypes[data].toggleSelect ? 0 : null )
  const [toggSelected, setToggSelected] = useState(initalToggleState())

  return (
    <div>
      { selectCounty && dataTypes[filterFeat] ? (
      <div className='rtMenu'>
        <div className='rtBody'>
          <h1 className='rt__title'>{dataTypes[filterFeat].title}</h1>
          <p className='rt__desc'>{dataTypes[filterFeat].desc}</p>
          <h3 className='rt__name'>{selectCounty ? selectCounty.name + ' County' : '' }</h3>

          { dataTypes[data].toggleSelect ? (
            <div className='rt__toggleSelect'>
              <ToggleSelect data={dataTypes[filterFeat].toggleSelect} dataID={dataTypes[filterFeat].toggleSelectKeys} dataLabel={dataTypes[filterFeat].toggleLegendLabel} setToggSelected= {setToggSelected}/>
            </div>
          ) : ''}
          
          { dataTypes[data].radioSelect ? (
            <div className='rt__radioSelect'>
              <RadioSelect data={dataTypes[filterFeat].radioSelect[toggSelected]} handleChange={(idx) => console.log(idx)} alignment={'row'}/>
            </div>
          ) : ''}

          {/* WIC data and Census Data has race type pie chart; others have a different pie chart */}
          <div className='rt__donut'>
            {(data === 'WIC' || data === 'Census') ? <Donut /> : <UnequalDonut data={pieData} />}    
          </div>
        </div>
        <div className='rt__footer'>
          <a alt='link to surce' href='#a' className='rt__link'>Link to source</a>  
        </div>
      </div>
    ) : (
      <div className='rtMenu noCounty'><p className='rt__noCounty'>Select a county to view {filterFeat}</p></div>
    )}
    </div> 
  )
}
export default RightHandMenu
