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

  const onToggle = e => {
    selectFeat === e.target.name ? dispatch(updateSelectFeat('')) :  dispatch(updateSelectFeat(e.target.name))
  }

  return (
    <div className="menu" id="right-menu">
      <div id="right-menu-county">
        <h2>County Map</h2>
        <label htmlFor="overall-poverty">
          Overall Poverty
          <input type="checkbox"  id="overall-poverty" name="overall-poverty" className="toggle" onChange={onToggle} checked={selectFeat === "overall-poverty"} ></input>
        </label>
        <label htmlFor="child-poverty">
          Child Poverty
          <input type="checkbox"  id="child-poverty" name="child-poverty" className="toggle" onChange={onToggle} checked={selectFeat === "child-poverty"}></input>
        </label>
        {/* changed zoom to less than 5 to check race data on geoJson */}
        {currentViewport.zoom > 5 &&
          <div id="right-menu-zipcode">
            <h2>Zipcode Map</h2>
            <label htmlFor="asian">
              Asian
              <input type="checkbox"  id="asian" name="asian" className="toggle" onChange={onToggle} checked={selectFeat === "asian"}></input>
            </label>
            <label htmlFor="black">
              Black
              <input type="checkbox"  id="black" name="black" className="toggle" onChange={onToggle} checked={selectFeat === "black"}></input>
            </label>
            <label htmlFor="hispaniclatino">
              Hispanic/Latino
              <input type="checkbox"  id="hispaniclatino" name="hispaniclatino" className="toggle" onChange={onToggle} checked={selectFeat === "hispaniclatino"}></input>
            </label>
            <label htmlFor="native">
              Native
              <input type="checkbox"  id="native" name="native" className="toggle" onChange={onToggle} checked={selectFeat === "native"}></input>
            </label>
            <label htmlFor="pacific">
              Pacific
              <input type="checkbox"  id="pacific" name="pacific" className="toggle" onChange={onToggle} checked={selectFeat === "pacific"}></input>
            </label>
            <label htmlFor="white">
              White
              <input type="checkbox"  id="white" name="white" className="toggle" onChange={onToggle} checked={selectFeat === "white"}></input>
            </label>
            <label htmlFor="other">
              Other
              <input type="checkbox"  id="other" name="other" className="toggle" onChange={onToggle} checked={selectFeat === "other"}></input>
            </label>
            <label htmlFor="total">
              Total
              <input type="checkbox"  id="total" name="total" className="toggle" onChange={onToggle} checked={selectFeat === "total"}></input>
            </label>
          </div>
        }
      </div>
      <div className='legend'><div className='legend1'></div> <span>Min</span></div>
      <div className='legend'><div className='legend2'></div> <span>Max</span></div>
    </div>
  )
}
export default RightHandMenu;
