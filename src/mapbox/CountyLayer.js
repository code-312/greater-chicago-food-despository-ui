import React from 'react'
import {Source, Layer} from 'react-map-gl';
import { useSelector } from 'react-redux';
import {county, selectedCounty} from './LayerStyles';

const CountyLevel = () => {
    /**
     * illinois_counties = County GeoJSON and county level data.
     * filter = hovered/highlight zipcode/county
     */
  const filters = useSelector(state => state.filters)
  const illinois_counties = useSelector(state => state.illinois_counties)
  const selectFeat = useSelector(state => state.select_Feat)
  console.log('feature in State:', selectFeat)
    return (
      <Source id="counties" type="geojson" data={illinois_counties.counties}>
        <Layer {...county}></Layer>
        <Layer {...selectedCounty} filter={filters.highlightCounty}></Layer>
      </Source>
  )
}

export default CountyLevel;
