import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT: MapColorLegend
 * This is the key/legend on the map showing the ranges represented by the colors 
 * of the counties & zipcodes.  This can be either numeric or percentage-based,
 * so the component should receive as inputs:
 * 1) the colors representing the selected metric
 * 2) the ranges of the bins; for mvp each bin is 25% but we still will need a range 
 * in case this is a numeric bin
 */
function MapColorLegend(props) {

  /* For testing - remove later. These will be likely passed in as props */
  const colors = [
    '#D8F9DB',
    '#7EC484',
    '#48944D',
    '#237528',
  ];

  const ranges = [
    '0-25%',
    '25-50%',
    '50-75%',
    '75-100%'
  ];

  const ranges_alt = [
    '0-1533',
    '1533-3439',
    '3440-14564',
    '145564-232434'
  ];


  return !colors ? null : (
    <div class="legend clearfix" >
      <span>Color Key</span>
      <div class="bin-container">
        {colors.map((color, i) => {
          return (
            <div class="bin">
              <div class="bin-color-sample" style={{background:color}}></div>
              <span class="bin-label">{ranges ? ranges[i] : null}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MapColorLegend;
