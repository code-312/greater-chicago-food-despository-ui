import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSelector } from 'react-redux'

import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedfilterFeat, selectedCounty } = selectedFeat

  const {radioSelect, toggSelected, radioClick} = props

	const handleSelection = (selected) => {
    radioClick(radioSelect[toggSelected].findIndex(option => option === selected.value))
	}

  console.log("radioSelect", radioSelect, ' | toggSelected,', toggSelected, " | selectefiltereFeat", selectedfilterFeat);

	/* Don't load this bar if there are no dataset options */  
	return (radioSelect && selectedCounty) ? (
    <div className="extraData-wrapper">
			<h3 className="extraData-title">Show data for:</h3>
      <Dropdown 
        arrowClassName='arrow'
        options={radioSelect[toggSelected]} 
        onChange={handleSelection} 
        value={radioSelect[toggSelected][0]}
        placeholder="Select an option"
      />
		</div>
	) : ''
}

export default ExtraDataMenu
