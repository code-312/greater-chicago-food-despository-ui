import React from "react";

import {DataContext} from "../App";
import {reduxRender} from "../test-utils";
import CountyLayer from './CountyLayer';
import DatasetSelector from
  '../components/LeftHandMenu/DatasetSelector/DatasetSelector';
import ExtraDataMenu from '../components/ExtraDataRightMenu/ExtraDataMenu';


// import {Source, Layer} from 'react-map-gl';
var Div = ({children}) => <div>{children}</div>;
var Source = Div;
var Layer = Source;
jest.mock("react-map-gl", () => {
    return {
        __esModule: true,
        //Mock the map components in CountyLayer
        Source: Div,
        Layer: Div,
        default: Div,
    };
});

test.only("change the filter when race selected should not break the app", () => {
  const data = {
    counties: require("../fetched_data/countyLayer.json"),
    countyData: require("../fetched_data/countyData.json"),
    metaData: require("../fetched_data/metaData.json"),
    illinois_zipcodes: require("../fetched_data/zipLayer.json"),
    zip_data: require("../fetched_data/zipData.json"),
  };


  const tools = reduxRender(
    <DataContext.Provider value={data}>
      <CountyLayer/>
      <DatasetSelector />
			<ExtraDataMenu />

    </DataContext.Provider>,

    {
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
    },
  );


    tools.getByLabelText(/WIC/).click();

    expect((tools.getByLabelText('White')).checked).toBeTruthy();

    tools.getByLabelText(/Native/).click();

    expect((tools.getByLabelText('Native')).checked).toBeTruthy();

    tools.getByLabelText(/Snap/).click();
    expect((tools.getByLabelText(/Snap/)).checked).toBeTruthy();

    expect((tools.getByLabelText('White')).checked).toBeFalsy();
    expect((tools.getByLabelText('Native')).checked).toBeTruthy();
    tools.getByLabelText(/Race/).click();
    expect((tools.getByLabelText('Native')).checked).toBeTruthy();
    expect((tools.getByLabelText(/Race/)).checked).toBeTruthy();


});

