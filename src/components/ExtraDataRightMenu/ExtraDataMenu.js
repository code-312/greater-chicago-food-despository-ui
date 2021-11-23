import React, { useEffect } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSelector } from 'react-redux'

import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedCounty } = selectedFeat

  const {radioSelect, toggSelected, radioClick, dropDownValue} = props

	const handleSelection = (selected) => {
    radioClick(radioSelect[toggSelected].findIndex(option => option === selected.value))
	}

  useEffect(() => {
    radioClick(dropDownValue)
  }, [radioSelect, toggSelected, dropDownValue])
  
	/* Don't load this bar if there are no dataset options */  
	return (radioSelect && selectedCounty) ? (
    <div className="extraData-wrapper font-normal">
			<h3 className="extraData-title font-bold primary-color">Show data for:</h3>
      <Dropdown 
        arrowClassName='arrow'
        // arrowClosed='arrow'
        arrowOpen='arrow'
        options={radioSelect[toggSelected]} 
        onChange={handleSelection} 
        value={radioSelect[toggSelected][0]}
      />
		</div>
	) : ''
}

export default ExtraDataMenu
