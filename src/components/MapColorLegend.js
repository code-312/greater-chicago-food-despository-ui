import React, {useContext} from 'react'
import {useSelector} from 'react-redux';
import {DataContext} from '../App'


import {extractCountyAndMetricDictionary,getDataForSelector} from "../mapbox/ExtractCountyDataUtil"

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
  const { metaData } = useContext(DataContext)

  const {selectedfilterFeat, selectedfilterSubfeat} = useSelector(state => state.selectedFeat)
  const {selectedExtraDataFeat} = useSelector(state => state.extraDataMenuFeat)

  const categoryRanges = getDataForSelector({
      selectedfilterFeat,
      selectedfilterSubfeat,
      selectedExtraDataFeat,
      currentObjectToSearch: metaData.data_bins.natural_breaks});

  const colors = [
    '#D8F9DB',
    '#7EC484',
    '#48944D',
    '#237528',
  ];


 const rangeLabels = categoryRanges
       .map((value, i, allValues) => {
           if (i === allValues.length - 1) {
               return null;
           }
           return `${value}-${allValues[i + 1]}`;
       })
       .filter((range) => range !== null);



  return !colors ? null : (
    <div className="map-color-legend clearfix" >
      <span>Color Key</span>
      <div className="bin-container">
        {colors.map((color, i) => {
          return (
            <div className="bin" key={i}>
              <div className="bin-color-sample" style={{background:color}}></div>
              <span className="bin-label">{rangeLabels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MapColorLegend;
