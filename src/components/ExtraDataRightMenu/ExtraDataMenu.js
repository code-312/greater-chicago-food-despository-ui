// import React, {useState, useEffect} from 'react'
// import RadioSelect from '../Utility/RadioSelect/RadioSelect'

// import { useSelector, useDispatch } from 'react-redux'
// import { updateExtraDataFeat } from  '../../redux/extraDataMenuReducer'
// import {getExtraDataLabelDictionary} from '../../mapbox/DataSelectionUtil'
// import './ExtraDataMenu.css'

// function ExtraDataMenu(props) {
// 	const dispatch = useDispatch()
//   const selectedFeat = useSelector(state => state.selectedFeat)
//   const { selectedfilterFeat, selectedfilterSubfeat, selectedCounty } = selectedFeat

import React, { useEffect } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSelector } from 'react-redux'

import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedCounty } = selectedFeat

  const {radioSelect, toggSelected, radioClick, dropDownValue} = props

  // useEffect(() => {
  //     setRadioData(getExtraDataLabelDictionary(selectedfilterFeat,selectedfilterSubfeat))
  // },[selectedfilterFeat,selectedfilterSubfeat])

	// const handleSelection = (idx) => {
	// 	dispatch(updateExtraDataFeat({
	// 		  selectedExtraDataFeat: radioData[Object.keys(radioData)[idx]],
  //       selectedExtraDataFeatLabel: Object.keys(radioData)[idx]
	// 	}))
	// }

	const handleSelection = (selected) => {
    radioClick(radioSelect[toggSelected].findIndex(option => option === selected.value))
	}

  useEffect(() => {
    radioClick(dropDownValue)
  }, [radioSelect, toggSelected, dropDownValue])
  
	/* Don't load this bar if there are no dataset options */  
	return (radioSelect && selectedCounty) ? (
    <div className="extraData-wrapper font-normal">
			<h3 className="extraData-title">Show data for:</h3>
      <Dropdown 
        arrowClassName='arrow'
        options={radioSelect[toggSelected]} 
        onChange={handleSelection} 
        value={radioSelect[toggSelected][0]}
      />
		</div>
	) : ''
}

export default ExtraDataMenu
