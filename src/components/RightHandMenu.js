import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectFeat } from './../redux/selectFeatReducer'

/**
 * COMPONENT: RightHandMrnu
 */
const RightHandMenu = () => {
  const dispatch = useDispatch()
  //useSelector gets viewport state from Redux store
  const currentViewport = useSelector(state => state.viewport);
  const selectFeat = useSelector(state => state.select_Feat);

  const countyMenus = ['Overall Poverty', 'Child Poverty'];
  const countyLabels = ['overall-poverty', 'child-poverty'];
  const zipMenus = ['Asian', 'Black', 'Hispanic/Latino', 'Native', 'Pacific', 'White', 'Other', 'Total'];
  const zipLabels = ['asian', 'black', 'hispaniclatino', 'native', 'pacific', 'white', 'other', 'total'];

  const onToggle = e => {
    selectFeat === e.target.name ? dispatch(updateSelectFeat('')) :  dispatch(updateSelectFeat(e.target.name))
  }

  return (
    <div className="menu" id="right-menu">
      <div id="right-menu-county">
      <h2>County Map</h2>
        {countyLabels.map((feature, i) => {
          return (
            <label htmlFor={feature} key={i}>
              {countyMenus[i]}
              <input type="checkbox" id={feature} name={feature} className="toggle" onChange={onToggle} checked={selectFeat === feature}></input>
            </label>
          )
        })}
        {currentViewport.zoom > 7 &&
          <div id="right-menu-zipcode">
            <h2>Zipcode Map</h2>
            {zipLabels.map((feature, i) => {
              return (
                <label htmlFor={feature} key={i}>
                  {zipMenus[i]}
                  <input type="checkbox" id={feature} name={feature} className="toggle" onChange={onToggle} checked={selectFeat === feature}></input>
                </label>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}
export default RightHandMenu;
