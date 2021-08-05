import React from 'react';
import {Source, Layer} from 'react-map-gl';
import { useSelector } from 'react-redux';
import {zipcode, selectedZipcode} from './LayerStyles';

const ZipcodeLevel = () => {
  /**
    * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
    * filter = hovered/highlight zipcode/county
  */
  const filters = useSelector(state => state.filters)
  const illinois_zipcodes = useSelector(state => state.illinois_zipcodes)
    return (
      <Source id="zipcodes" type="geojson" data={illinois_zipcodes.zipcodes}>
       <Layer {...zipcode} filter={filters.filterZipcodeByCounty}></Layer>
       <Layer {...selectedZipcode} filter={filters.highlightZipcode}></Layer>
      </Source>
    )
}

export default ZipcodeLevel;
