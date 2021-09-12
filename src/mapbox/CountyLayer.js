import React, {useContext, useMemo} from 'react'
import {Source, Layer} from 'react-map-gl';
import {useSelector} from 'react-redux';
import {county, selectedCounty, hoverCounty} from './LayerStyles';

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
      countyValueDictionary:extractCountyAndMetricDictionary(selectedFeat, extraDataFeat, countyData), 
      categoryMaximumValues: categoryRanges.slice(1),
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
