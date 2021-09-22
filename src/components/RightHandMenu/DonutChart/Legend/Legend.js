import React, {useState, useEffect} from 'react'

import "./Legend.css";
import { useSelector, useDispatch } from 'react-redux'
import { updateExtraDataFeat } from  '../../../../redux/extraDataMenuReducer'

/*
 * COMPONENT: Legend
 * Legend list for pie chart
 * data with color value and name comes as props from donut or unequalDonut component
 */
function Legend(props) {
	const dispatch = useDispatch()
	const selectedFeat = useSelector(state => state.selectedFeat)
  const { selectedfilterFeat, selectedfilterSubfeat, selectedCounty } = selectedFeat

    const getDisplayValue = (item) =>
          props.dataType === "percentValue"
          ? `${item.value} (${item.percent}%)`
          : props.dataType === "percent"
          ? item.value + " %?"
          : item.value;
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

	const handleSelection = (key) => {
		dispatch(updateExtraDataFeat({
			  selectedExtraDataFeat:radioData[key] 
		}))
	}

  return (
    <div className="legend">
      {props.legend.map((item, idx) => (
          <LegendItem key={item} value={item.key}onClick={handleSelection} color={item.color} numberDisplay={getDisplayValue(item)}/>
      ))}
    </div>
  );
}


export function LegendItem({onClick,value,color,numberDisplay}){

    return <div className="leg__item"  onClick={onClick}>
               <div className="leg__left">
                 <div
                   className="leg__color"
                   style={{backgroundColor: color}}
                 ></div>
                 <div className="leg__name">{value}</div>
               </div>
               <div className="leg__rt">{numberDisplay}</div>
             </div>
             
}




export default Legend;
