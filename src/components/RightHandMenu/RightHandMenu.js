import React, {useState,useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedFeat } from  '../../redux/selectedFeatReducer'

import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
import UnequalDonut from './DonutChart/UnEqualDonut/UnequalDonut'

import {filterFeatChart} from '../Utility/filterFeatChart'
import { dataOptions } from './dataOptions'
import {DataContext} from '../../App'

/*
 * COMPONENT: RightHandMenu
 */

const RightHandMenu = () => {
  const dispatch = useDispatch()

  // get all County features data and selected feature option from redux store
  const {countyData} = useContext(DataContext)
  const selectedFeat = useSelector(state => state.selectedFeat)

  const { selectedCounty, selectedfilterFeat } = selectedFeat

  // Pass all data and selected data to filterFeatChart function which will filter out data and give data as required by chart
  let pieData = filterFeatChart(countyData, selectedFeat)

  // To keep track of which toggleSelect option is selected, so that respective radioSelect Options can be rendered
  const initalToggleState = () => (dataOptions[selectedfilterFeat].toggleSelect ? dataOptions[selectedfilterFeat].toggleSelect[0] : null )
  const initialToggleIdxState = () => (dataOptions[selectedfilterFeat].toggleSelect ? 0 : null )
  const [toggSelected, setToggSelected] = useState(initalToggleState())
  const [toggIdxSelected, setToggIdxSelected] = useState(initialToggleIdxState())

  const radioClick = (idx) => {
    if (dataOptions[selectedfilterFeat].radioSelect[toggSelected+'Keys']) {
      dispatch(updateSelectedFeat({...selectedFeat, ...{
        selectedfilterSubfeat: dataOptions[selectedfilterFeat].radioSelect[toggSelected+'Keys'][idx],
        featLabel: dataOptions[selectedfilterFeat].legendLabels[toggIdxSelected]
      }}))
      pieData = filterFeatChart(countyData, selectedFeat)
    }
  }

  return (
    <div>
      { selectedCounty && dataOptions[selectedfilterFeat] ? (
      <div className='rtMenu'>
        <div className='rtBody'>
          <h1 className='rt__title'>
            {dataOptions[selectedfilterFeat].title === 'Race/Ethnicity' ? (
              <>
                Race/Ethnicity
                <span style={{ fontSize: '.85rem' }}> (Census)</span>
              </>
            ) : (
              dataOptions[selectedfilterFeat].title
            )}
          </h1>
          <p className='rt__desc'>{dataOptions[selectedfilterFeat].desc}</p>
          <h3 className='rt__name'>{selectedCounty ? selectedCounty.name + ' County' : ''}</h3>

          { dataOptions[selectedfilterFeat].toggleSelect ? (
            <div className='rt__toggleSelect'>
              <ToggleSelect data={dataOptions[selectedfilterFeat].toggleSelect} 
                            dataID={dataOptions[selectedfilterFeat].toggleSelectKeys} 
                            dataLabel={dataOptions[selectedfilterFeat].legendLabels} 
                            setToggSelected={setToggSelected} 
                            setToggIdxSelected={setToggIdxSelected} 
              />
            </div>
          ) : ''}
          
          { dataOptions[selectedfilterFeat].radioSelect ? (
            <div className='rt__radioSelect'>
              <RadioSelect data={dataOptions[selectedfilterFeat].radioSelect[toggSelected]} 
                           handleChange={(idx) => radioClick(idx)} 
                           alignment={'row'}
              />
            </div>
          ) : ''}

          {/* WIC data and Census Data has race type pie chart; others have a different pie chart */}
          <div className='rt__donut'>
            {(selectedfilterFeat === 'poverty_data' || selectedfilterFeat === 'insecurity_data') ? <UnequalDonut data={pieData} 
                                                                                                  dataType={dataOptions[selectedfilterFeat].dataType} 
                                                                                    /> 
                                                                                  : <Donut data={pieData} 
                                                                                           dataType={dataOptions[selectedfilterFeat].dataType} 
                                                                                    /> 
            }
          </div>
        </div>
        <div className='rt__footer'>
          <a alt='link to surce' href='#a' className='rt__link'>Link to source</a>  
        </div>
      </div>
    ) : (
      <div className='rtMenu noCounty'><p className='rt__noCounty'>Select a county to view {dataOptions[selectedfilterFeat].title}</p></div>
    )}
    </div> 
  )
}
export default RightHandMenu
