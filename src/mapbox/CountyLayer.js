import React from 'react'
import {Source, Layer} from 'react-map-gl';
import { useSelector } from 'react-redux';
import {county, selectedCounty, hoverCounty} from './LayerStyles';

import {
  getCountyAndColorDictionary,
  retrieveCountyAndMetricDictionary,
} from "./CountyColorsUtil";

const CountyLevel = () => {
  /**
   * illinois_counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
  const filters = useSelector(state => state.filters)
  const illinois_counties = useSelector(state => state.illinois_counties)
  const selectedFeat = useSelector(state => state.selectedFeat)
  const extraDataFeat = useSelector(state => state.extraDataMenuFeat)
  const countyData = useSelector(state => state.county_data.countyData)
  
  const countyColorDictionary= getCountyAndColorDictionary({
        countyValueDictionary: retrieveCountyAndMetricDictionary(selectedFeat, extraDataFeat, countyData),
        categoryMaximumValues: [25, 50, 75, 20000000],
        colorsForCategories: ["#D8F9DB", "#7EC484", "#48944D", "#237528"],
        minimumCategoryValue: 0,
  })

  console.log(countyColorDictionary.countyValueDictionary)
  
  return (
    <Source id="counties" type="geojson" data={illinois_counties.counties}>
      {/* Use useMemo if this calculation slows down the app */}
      {Object.keys(countyColorDictionary).map((countyName) => (
        <Layer
          {...{...county, id: countyName}}
          key={countyName}
          paint={{
            ...county.paint,
            "fill-color": countyColorDictionary[countyName],
          }}
          filter={["in", "NAME", countyName]}
        />
      ))}
       <Layer {...selectedCounty} filter={filters.selectedCounty}></Layer>
       <Layer {...hoverCounty} filter={filters.highlightCounty}></Layer>
     
    </Source>
  );
};

export default CountyLevel;
