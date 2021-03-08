import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT: RightHandMrnu
 */
const RightHandMenu = () => {
  //useSelector gets viewport state from Redux store
  const currentViewport = useSelector(state => state.viewport);
  return (
    <div className="menu" id="right-menu">
      <div id="right-menu-county">
        <h2>County Map</h2>
        <label htmlFor="overall-poverty">
          Overall Poverty
          <input type="checkbox"  id="overall-poverty" name="overall-poverty" className="toggle" defaultChecked></input>
        </label>
        {currentViewport.zoom > 7 &&
          <div id="right-menu-zipcode">
            <h2>Zipcode Map</h2>
            <label htmlFor="group1">
              Group 1
              <input type="checkbox"  id="group1" name="group1" className="toggle"></input>
            </label>

            <label htmlFor="group2">
              Group 2
              <input type="checkbox"  id="group2" name="group2" className="toggle"></input>
            </label>

            <label htmlFor="group3">
              Group 3
              <input type="checkbox"  id="group3" name="group3" className="toggle"></input>
            </label>

            <label htmlFor="group4">
              Group 4
              <input type="checkbox"  id="group4" name="group4" className="toggle"></input>
            </label>

            <label htmlFor="group5">
              Group 5
              <input type="checkbox"  id="group5" name="group5" className="toggle"></input>
            </label>
          </div>
        }
        <label htmlFor="child-poverty">
          Child Poverty
          <input type="checkbox"  id="child-poverty" name="child-poverty" className="toggle" defaultChecked></input>
        </label>
      </div>
    </div>
  )
}
export default RightHandMenu;
