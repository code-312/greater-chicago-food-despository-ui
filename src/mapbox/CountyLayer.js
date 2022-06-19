import React, {useContext, useMemo, useEffect} from 'react'
import {Source, Layer} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux'
import {mapColors,categoryOpacityGroup} from "./Colors"
import {selectedCounty, hoverCounty} from './LayerStyles';
import {setSelectionDefaults} from './MapSelectionDefaults';

import {DataContext} from '../App'
import {
  getCountyAndColorDictionary,
} from "./CountyColorsUtil";

import {extractCountyAndMetricDictionary,getDataForSelector} from "./ExtractCountyDataUtil.js"
import {
    getExtraDataLabelDictionary,
} from './DataSelectionUtil';

const CountyLevel = () => {
  /**
   * counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
  const filters = useSelector(state => state.filters)
  const { countyData, counties, metaData } = useContext(DataContext)
  const selectedFeat = useSelector(state => state.selectedFeat)
  const selectedExtraDataFeat = useSelector(state => state.extraDataMenuFeat.selectedExtraDataFeat)
  const dispatch = useDispatch()

  useEffect(() => {
      setSelectionDefaults({
          selectedFeat,
          dispatch,
          selectedExtraDataFeat: selectedExtraDataFeat,
      });
  }, [selectedFeat]);


  const extraDataFeat = useSelector(state => state.extraDataMenuFeat)
  
  let categoryRanges = getDataForSelector({
      selectedfilterFeat: selectedFeat.selectedfilterFeat,
      selectedfilterSubfeat: selectedFeat.selectedfilterSubfeat,
      selectedExtraDataFeat: extraDataFeat.selectedExtraDataFeat,
      currentObjectToSearch: metaData.data_bins.natural_breaks,
  });

  if(categoryRanges === undefined){
      categoryRanges = getDataForSelector({
          selectedfilterFeat: selectedFeat.selectedfilterFeat,
          selectedfilterSubfeat: selectedFeat.selectedfilterSubfeat,
          selectedExtraDataFeat: getExtraDataLabelDictionary(selectedFeat.selectedfilterFeat)[extraDataFeat.selectedExtraDataFeatLabel],
         currentObjectToSearch: metaData.data_bins.natural_breaks,
      });
  }

  const countyColorDictionary= getCountyAndColorDictionary({
        countyValueDictionary: extractCountyAndMetricDictionary(selectedFeat, extraDataFeat, countyData),
        categoryMaximumValues: categoryRanges.slice(1),
        opacityGroup: categoryOpacityGroup,
        minimumCategoryValue: 0,
  })

  const colorLayers = useMemo(
      () =>
          Object.keys(countyColorDictionary).map((countyName) => (
              <Layer
                {...{ id: countyName, type: 'fill'}}
                key={countyName}
                paint={{
                    "fill-outline-color": "#124c1b", 
                    "fill-color": mapColors[selectedExtraDataFeat] || mapColors.default,
                    "fill-opacity" : countyColorDictionary[countyName]
                }}
                filter={["in", "NAME", countyName]}
              />
          )),
      [countyColorDictionary],
  );

  return (
    <Source id="counties" type="geojson" data={counties}>
      {colorLayers}
      <Layer {...selectedCounty} filter={filters.selectedCounty}></Layer>
      <Layer {...hoverCounty} filter={filters.highlightCounty}></Layer>
    </Source>
  );
};

export default CountyLevel;
