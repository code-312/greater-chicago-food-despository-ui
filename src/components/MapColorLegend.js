import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {DataContext} from "../App";
import {mapColors, categoryOpacityGroup} from "../mapbox/Colors";
import {getExtraDataLabelDictionary} from "../mapbox/DataSelectionUtil";

import {
  extractCountyAndMetricDictionary,
  getDataForSelector,
} from "../mapbox/ExtractCountyDataUtil";

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
  const {metaData} = useContext(DataContext);

  const {selectedfilterFeat, selectedfilterSubfeat} = useSelector(
    (state) => state.selectedFeat,
  );
  const {selectedExtraDataFeat, selectedExtraDataFeatLabel} = useSelector(
    (state) => state.extraDataMenuFeat,
  );
  const categoryRangesWithCurrentValues = getDataForSelector({
    selectedfilterFeat,
    selectedfilterSubfeat,
    selectedExtraDataFeat,
    currentObjectToSearch: metaData.data_bins.natural_breaks,
  });
  const categoryRanges = categoryRangesWithCurrentValues
    ? categoryRangesWithCurrentValues
    : getDataForSelector({
        selectedfilterFeat,
        selectedfilterSubfeat,
        selectedExtraDataFeat: getExtraDataLabelDictionary(selectedfilterFeat)[
          selectedExtraDataFeatLabel
        ],
        currentObjectToSearch: metaData.data_bins.natural_breaks,
      });


  const rangeLabels = categoryRanges
    .map((value, i, allValues) => {
      if (i === allValues.length - 1) {
        return null;
      }
      return `${value}-${allValues[i + 1]}`;
    })
    .filter((range) => range !== null);

  return (
    <div className="map-color-legend clearfix">
      <span>Color Key</span>
      <div className="bin-container">
        {rangeLabels.map((range, i) => {
          return (
            <div className="bin" key={range}>
              <div
                className="bin-color-sample"
                style={{
                  opacity: categoryOpacityGroup[i],
                  background:
                    mapColors[selectedExtraDataFeat] || mapColors.default,
                }}
              ></div>
              <span className="bin-label">{range}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MapColorLegend;
