import React, { useState } from 'react'

import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
import UnequalDonut from './DonutChart/UnEqualDonut/UnequalDonut'
import mockData from './mock_full_data'

// Static Content to show in right hand menu
const dataMap = {
  'Census': {dataType: 'Census', dataOption: 'Census'},
  'Food Insecurity 2018': {dataType: 'Food Insecurity', dataOption: 'Food Insecurity 2018'},
  'Food Insecurity 2018 Children': {dataType: 'Food Insecurity', dataOption: 'Food Insecurity 2018 Children'},
  'Poverty': {dataType: 'Poverty', dataOption: 'Poverty'},
  'Poverty Children': {dataType: 'Poverty', dataOption: 'Poverty Children'}
}
const dataTypes = {
  Poverty : {
    title: 'Poverty Rates',
    desc: 'Text about poverty rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    radioSelect: null
  },
  'Food Insecurity': {
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

const dataOptions = {
  'Food Insecurity 2018': {
    calculateSum: false,
    key: 'insecurity_data',
    nestedKeys: ['insecurity_2018'],
    values: [
        {name: 'Food Insecurity', field: 'insecurity_2018'},
        {name: 'Total Population', field: 'total'}
      ]
  },
  'Food Insecurity 2018 Children': {
    calculateSum: false,
    key: 'insecurity_data',
    nestedKeys: ['insecurity_2018_child'],
    values: [
        {name: 'Food Insecurity', field: 'insecurity_2018_child'},
        {name: 'Total Population', field: 'total'}
      ]
  },
  'Poverty': {
    calculateSum: false,
    key: 'poverty_data',
    nestedKeys: ['poverty_percentages','poverty_population_poverty'],
    values: [
        {name: 'Overall Poverty', field: 'poverty_population_poverty'},
        {name: 'Total Population', field: 'total'}
      ]
  },
  'Poverty Children': {
    calculateSum: false,
    key: 'poverty_data',
    nestedKeys: ['poverty_percentages', 'poverty_population_poverty_child'],
    values: [
        {name: 'Child Poverty', field: 'poverty_population_poverty_child'},
        {name: 'Total Population', field: 'total'}
      ]
  },
  'Census': {
    calculateSum: true,
    key: 'race_data',
    values: [
      {name: 'Asian', field: 'race_asian'},
      {name: 'Black', field: 'race_black'},
      {name: 'Hispanic/Latino', field: 'race_hispaniclatino_total'},
      {name: 'White', field: 'race_white'},
      {name: 'Native American', field: 'race_native'},
      {name: 'Other', field: 'race_other'},
      {name: 'Pacific', field: 'race_pacific'},
      {name: 'Two+', field: 'race_twoplus_total'}
    ]
  }
}

const fetchData = (currentDataKey, nestedFields) => {
  console.log('nestedFields', nestedFields)
  let data = mockData[currentDataKey];
  if (nestedFields) {
    nestedFields.forEach(field => {
      data = data[field]
      console.log('data', data)
    })
    const dataKey = nestedFields[nestedFields.length-1]
    data = {[dataKey]: data, 'total': 1-data}
  }
  return data
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
  const dataType = dataTypes[dataMap[data].dataType]
  const dataOption = dataMap[data].dataOption

  // To keep track of which toggleSelect option is selected, so that respective radioSelect Options can be rendered
  const initalToggleState = () => (dataType.toggleSelect ? dataType.toggleSelect[0] : null )

  const [toggSelected, setToggSelected] = useState(initalToggleState())
  const currentDataKey = dataOptions[dataOption].key
  const currentDataValues = dataOptions[dataOption].values

  return (
    <div>
      { county ? (
      <div className='rtMenu'>
        <div className='rtBody'>
          <h1 className='rt__title'>{dataType.title}</h1>
          <p className='rt__desc'>{dataType.desc}</p>
          <h3 className='rt__name'>{county}</h3>

          { dataType.toggleSelect ? (
            <div className='rt__toggleSelect'>
              <ToggleSelect data={dataType.toggleSelect} setToggSelected= {setToggSelected}/>
            </div>
          ) : ''}

          { dataType.radioSelect ? (
            <div className='rt__radioSelect'>
              <RadioSelect data={dataType.radioSelect[toggSelected]} handleChange={(idx) => console.log(idx)} alignment={'row'}/>
            </div>
          ) : ''}

          {/* WIC data and Census Data has race type pie chart; others have a different pie chart */}
          <div className='rt__donut'>
              <Donut
                data={fetchData(currentDataKey, dataOptions[dataOption].nestedKeys)}
                values={currentDataValues}
                calculateSum={dataOptions[dataOption].calculateSum}/>
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
