import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateExtraDataFeat } from  '../redux/extraDataMenuReducer'
import { updateSelectedFeat } from  '../redux/selectedFeatReducer'
import {screen} from "@testing-library/react";

import {render, reduxRender} from "../test-utils";
import {getCountyAndMetricDictionary} from "./CountyColorsUtil";


import {county, selectedCounty, hoverCounty} from './LayerStyles';
import {setSelectionDefaults} from './MapSelectionDefaults';

import {
  getCountyAndColorDictionary,
} from "./CountyColorsUtil";

// import {Source, Layer} from 'react-map-gl';
var Source = ({children}) => <div>
                               {children} 
                             </div>
var Layer = Source;

test.only("convert data to categories", () => {
     const tools = reduxRender(
        <CountyLevel/>, {
      initialState:{
          illinois_counties: require('../fetched_data/countyLayer.json'),
          county_data:  require('../fetched_data/countyData.json'),
          illinois_zipcodes: require('../fetched_data/zipLayer.json'),
          zip_data: require('../fetched_data/zipData.json'),
          filters: {
              selectedCounty: ["in", "COUNTY", ""],
              highlightCounty: ["in", "COUNTY", ""],
              highlightZipcode: ["in", "ZCTA", ""],
              filterZipcodeByCounty: ["in", "COUNTY", ""],
              x: null,
              y: null,
              hoveredCounty: null,
              hoveredZipCode: null,
          },
          viewport: {
              latitude: 40.150196,
              longitude: -89.367848,
              zoom: 6,
              width: 1300,
              height: 580,
          },
          selectedFeat: {
              selectedCounty: null,
              selectedZipcode: null,
              selectedfilterFeat: "poverty_data",
              selectedfilterSubfeat: "poverty_population_total",
              featLabel: null,
              extraDataFeatLabel: null,
          },
          extraDataMenuFeat: {selectedExtraDataFeat: null},
      },
  });
    tools.debug()
})


function CountyLevel ()  {
  /**
   * illinois_counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
  const filters = []
  const illinois_counties = []
  const selectedFeat = []
  const selectExtraDataFeat = []
    const countyData = []
    const state = []
  const dispatch = useDispatch()

  return (<Source id="counties" type="geojson" data={illinois_counties.counties}>
            <button id="main" onClick={()=>{console.log(state)}}>Click Me Be Be</button>
      {/* Use useMemo if this calculation slows down the app */}
  
       <Layer {...selectedCounty} filter={filters.selectedCounty}></Layer>
       <Layer {...hoverCounty} filter={filters.highlightCounty}></Layer>
     
    </Source>
  );
};

