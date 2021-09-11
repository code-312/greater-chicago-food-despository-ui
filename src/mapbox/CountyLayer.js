import React, {useContext, useMemo} from 'react'
import {Source, Layer} from 'react-map-gl';
import {useSelector} from 'react-redux';
import {county, selectedCounty, hoverCounty} from './LayerStyles';

import {DataContext} from '../App'
import {
  getCountyAndColorDictionary,
  retrieveCountyAndMetricDictionary,
} from "./CountyColorsUtil";

const CountyLevel = () => {
  /**
   * counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
  const filters = useSelector(state => state.filters)
  const { countyData, counties } = useContext(DataContext)

  const selectedFeat = useSelector(state => state.selectedFeat)
  const extraDataFeat = useSelector(state => state.extraDataMenuFeat)
  
  const countyColorDictionary= getCountyAndColorDictionary({
        countyValueDictionary: retrieveCountyAndMetricDictionary(selectedFeat, extraDataFeat, countyData),
        categoryMaximumValues: [25, 50, 75, Infinity],
        colorsForCategories: ["#D8F9DB", "#7EC484", "#48944D", "#237528"],
        minimumCategoryValue: 0,
  })
  const colorLayers = useMemo(
      () =>
          Object.keys(countyColorDictionary).map((countyName) => (
              <Layer
                {...{...county, id: countyName}}
                key={countyName}
                paint={{
                    ...county.paint,
                    "fill-color": countyColorDictionary[countyName],
                }}
                filter={["in", "NAME", countyName]}
              />
          )),
      [countyColorDictionary],
  );

  return (
    <Source id="counties" type="geojson" data={counties}>
      {colorLayers}
      <Layer {...county}></Layer>
      <Layer {...selectedCounty} filter={filters.selectedCounty}></Layer>
      <Layer {...hoverCounty} filter={filters.highlightCounty}></Layer>
     
    </Source>
  );
};

export default CountyLevel;
