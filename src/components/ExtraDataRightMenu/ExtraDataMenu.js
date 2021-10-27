import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSelector } from 'react-redux'

import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedfilterFeat, selectedCounty } = selectedFeat

  const {radioSelect, toggSelected, radioClick} = props

  const [dropDownValue, setDropDownValue] = useState("null")

	const handleSelection = (selected) => {
    console.log("This is what's getting passed to 'handleSelection' ", selected);
    radioClick(radioSelect[toggSelected].findIndex(option => option === selected.value))
    setDropDownValue(radioSelect[toggSelected][0])
	}

  useEffect(() => {
    handleSelection({value: radioSelect[toggSelected][0], label: radioSelect[toggSelected][0]})
    setDropDownValue(radioSelect[toggSelected][0])
    const dropDownDisplay = document.getElementsByClassName('is-selected');
    dropDownDisplay[0].innerText = dropDownValue
  },[radioSelect, toggSelected])
  
	/* Don't load this bar if there are no dataset options */  
	return (radioSelect && selectedCounty) ? (
    <div className="extraData-wrapper">
			<h3 className="extraData-title">Show data for:</h3>
      <Dropdown 
        arrowClassName='arrow'
        options={radioSelect[toggSelected]} 
        onChange={handleSelection} 
        value={dropDownValue}
      />
		</div>
	) : ''
}

export default ExtraDataMenu
