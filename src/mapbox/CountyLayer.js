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
   * Calling getPovertyPercentages will return an ordered array county objects.
   * e.g. [{countyName1: lowestPovertyPercentage}, {countyName2: nextLowestPovertyPercentage}]
   * This can be used on a choropleth layer for styling counties by color based on this metric.
  */
  const getPovertyPercentages = (countyData) => {
    console.log(countyData);
    const counties = [];
    const FIPS = Object.keys(countyData);
    FIPS.forEach((county) => {
      const currentCounty = {};
      const name = countyData[county].NAME;
      currentCounty.name = name.slice(0, name.indexOf(" County"));
      currentCounty.povertyPercentage = countyData[county].poverty_data.poverty_percentages.poverty_population_poverty;
      counties.push(currentCounty);
    })

    // sort counties by total poverty percentage
    counties.sort((a, b) => a.povertyPercentage - b.povertyPercentage);
    return counties;
  }

  console.log(getPovertyPercentages(countyData))

  return (
    <Source id="counties" type="geojson" data={illinois_counties.counties}>
      <Layer {...county}></Layer>
      <Layer {...selectedCounty} filter={filters.highlightCounty}></Layer>
    </Source>
  )
}

export default CountyLevel;
