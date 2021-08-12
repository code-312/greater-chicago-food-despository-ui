import React, {useState, useEffect} from 'react'
import RadioSelect from '../Utility/RadioSelect/RadioSelect'

import { useSelector, useDispatch } from 'react-redux'
import { updateExtraDataFeat } from  '../../redux/extraDataMenuReducer'

import './ExtraDataMenu.css'

function ExtraDataMenu(props) {
	const dispatch = useDispatch()
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedfilterFeat, selectedfilterSubfeat, selectedCounty } = selectedFeat

  const [radioData, setRadioData] = useState(null)

  useEffect(() => {
    	// Radio Options to select feature for data display
	const featOptions = {
    WIC: {
      Enrollment: {
        Women: 'wic_participation_women_data.total',
        Infants: 'wic_participation_infants_data.total',
        Children: 'wic_participation_children_data.total' 
      },
      wic_participation: {
        White: 'race_white',
        Asian: 'race_asian',
        Black: 'race_black',
        'Hispanic/Latino': 'hispanic_or_latino',
        Native: 'race_amer_indian_or_alaskan_native',
        Pacific: 'race_native_hawaii_or_pacific_islander',
        'Two+': 'race_multiracial'
      }
    },
    race_data: {
      White: 'race_white',
      Asian: 'race_asian',
      Black: 'race_black',
      'Hispanic/Latino': 'race_hispaniclatino_total',
      Native: 'race_native',
      Pacific: 'race_pacific',
      'Two+': 'race_twoplus_total',
      Other: 'race_other'
    },
    snap_data: {
      White: 'race_white',
      Asian: 'race_asian',
      Black: 'race_black',
      'Hispanic/Latino': 'race_hispaniclatino',
      Native: 'race_native',
      Pacific: 'race_pacific',
      Unknown: 'race_unknown'
    }
	}
    switch(selectedfilterFeat) {
      case 'WIC':
        if (selectedfilterSubfeat === 'Enrollment') {
          setRadioData(featOptions.WIC.Enrollment)
        } else {
          setRadioData(featOptions.WIC.wic_participation)
        }
        break
      case 'race_data':
        setRadioData(featOptions.race_data)
        break
      case 'snap_data':
        setRadioData(featOptions.snap_data)
        break
      default: 
        setRadioData(null)
        break
    }
  },[selectedfilterFeat,selectedfilterSubfeat])

	const handleSelection = (idx) => {
		dispatch(updateExtraDataFeat({
			selectedExtraDataFeat: radioData[Object.keys(radioData)[idx]]
		}))
	}

	/* Don't load this bar if there are no dataset options */
	return (radioData && selectedCounty) ? (
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
