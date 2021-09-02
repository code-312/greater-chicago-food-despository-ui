import React from "react";
import {screen} from "@testing-library/react";
import App from "../App";
import Map from "./Map";
import {render, reduxRender} from "../test-utils";
import CountyLevel from "./CountyLayer";
import {getCountyAndMetricDictionary} from "./CountyColorsUtil";
var Div = ({children}) => <div>{children}</div>;
var Source = Div;
var Layer = Source;
jest.mock("react-map-gl", () => {
  // Works and lets you check for constructor calls:
  return {
    __esModule: true,
    Source: Div,
    Layer: Div,
    NavigationControl: Div,
    default: Div,
  };
});
jest.mock("../components/LeftHandMenu/ZoomToBoundsMenu", () => {
  // Works and lets you check for constructor calls:
  return {__esModule: true, default: Div};
});
jest.mock("../redux/countyReducer", () => {
  return {countyFetch: () => {}};
});
jest.mock("../redux/countyDataReducer", () => {
  return {countyDataFetch: () => {}};
});
jest.mock("../redux/zipReducer", () => {
  return {zipFetch: () => {}};
});
jest.mock("../redux/zipCodeDataReducer", () => {
  return {zipDataFetch: () => {}};
});

test.only("convert data to categories", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
    const data =  {    illinois_counties: require("../fetched_data/countyLayer.json"),
          county_data: require("../fetched_data/countyData.json"),
          illinois_zipcodes: require("../fetched_data/zipLayer.json"),
          zip_data: require("../fetched_data/zipData.json"),
          } 

  const tools = reduxRender(<App />, {
    initialState: {
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
  // expect(tools.getByText(/White/)).toBeInTheDocument()
  tools.getByLabelText("WIC Usage").click();
  // // expect(tools.getByText(/White/)).toBeInTheDocument()
  tools.getByLabelText("Native").click();
  tools.getByLabelText("Snap Usage").click();
  console.log(2, "mostRecentSelection", window.mostRecentSelection);
});
