import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedFeat } from  '../../../redux/selectedFeatReducer'

import './ToggleSelect.css'

/*
 * COMPONENT: ToggleSelect
 * Always has only 2 options data to select which comes in as props from RightHandMenu
 * Some data needs to be filtered here for pie chart (use redux slice as props needs to be hoisted)
 */
function ToggleSelect(props) {
  const dispatch = useDispatch()
  const [active, setActive] = useState(0)
  const selectedFeat = useSelector(state => state.selectedFeat)

  useEffect(() => {
    props.setToggSelected(props.data[0])
    props.setToggIdxSelected(0)

    dispatch(updateSelectedFeat({...selectedFeat, ...{
      selectedfilterSubfeat: props.dataID[0],
      featLabel: props.dataLabel[0]
    }}))
    setActive(0)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.data])

  const optionClick = (select) => {
    props.setToggSelected(props.data[select])
    props.setToggIdxSelected(select)

    dispatch(updateSelectedFeat({...selectedFeat, ...{
      selectedfilterSubfeat: props.dataID[select],
      featLabel: props.dataLabel[select]
    }}))
    
    setActive(active === select ? active : select)
  }

  return (
    <div className='toggSel'>
      <div className={active === 0 ? 'toggOpt ts__a toggSelect' : 'toggOpt ts__a'} onClick={() => optionClick(0)}>{props.data[0]}</div>
      <div className={active === 1 ? 'toggOpt ts__b toggSelect' : 'toggOpt ts__b'} onClick={() => optionClick(1)}>{props.data[1]}</div>
    </div>
  )
}

export default ToggleSelect
