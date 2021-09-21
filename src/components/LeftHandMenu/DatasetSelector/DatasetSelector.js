import React from 'react'
import RadioSelect2 from '../../Utility/RadioSelect/RadioSelect2'

import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedFeat } from  '../../../redux/selectedFeatReducer'

import './DatasetSelector.css'
import CardHeader from '../../Utility/CardHeader/CardHeader'

function DatasetSelector(props) {
	const dispatch = useDispatch()
	const selectedFeat = useSelector(state => state.selectedFeat)

	// Radio Options to select feature for data display
	const featOptions = {
		featNames: ['Poverty Rates','Food Insecurity','WIC Usage','Snap Usage', 'Race/Ethnicity'],
		featKeys: ['poverty_data', 'insecurity_data', 'WIC', 'snap_data', 'race_data']
	}

	const handleSelection = (idx) => {
		// Handle selection in here.
		dispatch(updateSelectedFeat({...selectedFeat, ...{
			selectedfilterFeat: featOptions.featKeys[idx],
			selectedfilterSubfeat: null,
			featLabel: null
		}}))
	}

	/* Don't load this bar if there are no dataset options */
	return !featOptions ? null : (
		<div className="data-selector">
			<CardHeader text="Show data for:" />
			<RadioSelect2
				data={featOptions.featNames}
				handleChange={handleSelection}
				alignment={'column'}
			/>
		</div>
	)
}

export default DatasetSelector
