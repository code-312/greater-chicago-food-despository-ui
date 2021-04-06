
  /**
   * Returns a component that displays: the county name, and FIPS number.
   * If a zipcode is also highlighted, then also displays zipcode number.
   */

import React from 'react'
import { useSelector } from 'react-redux';

const RenderToolTip = () => {
    //these props are passed to the App component
    const filters = useSelector(state => state.filters)

    const {hoveredCounty, hoveredZipCode, x, y} = filters;
    const style = {
      position:'absolute',
      margin: 8,
      padding: 4,
      backgroundColor: 'lightgray',
      maxWidth: 300,
      fontSize: 10,
      zIndex: 9,
      pointerEvents: 'none',
      left: x,
      top: y
    }

    return (
      // Only returns the tool tip if there is a currently hovered county
      hoveredCounty && (
        <div style={style}>
          <div>County: {hoveredCounty.NAME}</div>
          <div>FIPS: {hoveredCounty.COUNTY}</div>
          {hoveredZipCode != null &&
            <div>Zipcode: {hoveredZipCode.ZCTA}</div>
          }
        </div>
      )
    );
}

export default RenderToolTip;
