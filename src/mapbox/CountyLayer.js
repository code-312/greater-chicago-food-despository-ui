import {Source, Layer} from "react-map-gl";
import {useSelector} from "react-redux";
import React, {useMemo} from "react";

import {county, selectedCounty} from "./LayerStyles";
import {
  getCountyAndColorGroup,
  retrieveCountyAndMetricGroup,
} from "./CountyColorsUtil";

const CountyLevel = () => {
  /**
   * illinois_counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
  const filters = useSelector((state) => state.filters);
  const illinois_counties = useSelector((state) => state.illinois_counties);

  return (
    <Source id="counties" type="geojson" data={illinois_counties.counties}>
      {/* Use useMemo if this calculation slows down the app */}
      {getCountyAndColorGroup({
        countyAndMetricGroup: retrieveCountyAndMetricGroup(),
        colorKeyword: "green",
        maxLightness: 70,
        minLightness: 20,
      }).map((countyAndColor) => (
        <Layer
          {...{...county, id: countyAndColor.county}}
          key={countyAndColor.county}
          paint={{
            ...county.paint,
            "fill-color": countyAndColor.color,
          }}
          filter={["in", "NAME", countyAndColor.county]}
        />
      ))}

      <Layer {...selectedCounty} filter={filters.highlightCounty}></Layer>
    </Source>
  );
};

export default CountyLevel;
