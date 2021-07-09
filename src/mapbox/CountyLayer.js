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
  const countyData = useSelector(state => state.county_data).countyData;

  /**
   * Calling getPovertyPercentages will return an ordered array
   * e.g. [[countyName1, lowestPovertyPercentage], [countyName2, nextLowestPovertyPercentage]]
   * This can be used on a choropleth layer for styling counties by color based on this metric
  */
  const getPovertyPercentages = (countyData) => {
    console.log(countyData);
    const counties = [];
    const FIPS = Object.keys(countyData);
    FIPS.forEach((county) => {
      const currentCounty = [];
      currentCounty.push(countyData[county].NAME.split(' ')[0]);
      currentCounty.push(countyData[county].poverty_data.poverty_percentages.poverty_population_poverty);
      counties.push(currentCounty);
    })

    // sort counties by total poverty percentage
    counties.sort((a, b) => a[1] - b[1]);
    return counties;
  }

  return (
    <Source id="counties" type="geojson" data={illinois_counties.counties}>
      <Layer {...county}></Layer>
      <Layer {...selectedCounty} filter={filters.highlightCounty}></Layer>
    </Source>
  )
}

export default CountyLevel;
