import React, {useState, useEffect} from 'react'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'

import { useSelector, useDispatch } from 'react-redux'
import { updateExtraDataFeat } from  '../../redux/extraDataMenuReducer'
import {getExtraDataLabelDictionary} from '../../mapbox/DataSelectionUtil'
import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const dispatch = useDispatch()
  const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedfilterFeat, selectedfilterSubfeat, selectedCounty } = selectedFeat

  const [radioData, setRadioData] = useState(null)

  useEffect(() => {
      setRadioData(getExtraDataLabelDictionary(selectedfilterFeat,selectedfilterSubfeat))
  },[selectedfilterFeat,selectedfilterSubfeat])

	const handleSelection = (idx) => {
		dispatch(updateExtraDataFeat({
			  selectedExtraDataFeat: radioData[Object.keys(radioData)[idx]],
        selectedExtraDataFeatLabel: Object.keys(radioData)[idx]
		}))
	}

	/* Don't load this bar if there are no dataset options */
	return (radioData) ? (
		<div className="extraData-wrapper">
			<h3 className="extraData-title">Show data for:</h3>
			<RadioSelect
				data={Object.keys(radioData)}
				handleChange={handleSelection}
				alignment={'column'}
			/>
		</div>
	) : ''
}

export default ExtraDataMenu
