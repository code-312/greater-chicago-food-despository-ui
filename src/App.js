import React, {useEffect} from "react";
import {useDispatch} from "react-redux";


import RightHandMenu from "./components/RightHandMenu/RightHandMenu";
import Map from "./mapbox/Map";
import MapColorLegend from "./components/MapColorLegend";
import LeftHandMenu from "./components/LeftHandMenu/LeftHandMenu";
import "./App.css";

const App = () => {
  const zipcodes = require("./fetched_data/zipLayer.json");
  const countyData = require('./fetched_data/countyData.json');
  const counties = require('./fetched_data/countyLayer.json')
  const metaData = require('./fetched_data/metaData.json')
  return <DataLayer data={{zipcodes,countyData,counties, metaData}}/>;
};

export const DataContext = React.createContext();

export function DataLayer({data}) {

  return (
    <DataContext.Provider value={data}> 
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            {/*Column 1: Left-hand menu (Zoom Control)*/}
            <nav className="LeftMenuWrapper">
              <LeftHandMenu />
            </nav>
            {/*Column 2: MapBox map */}
            <div className="col pl-0 pr-0">
              <Map />
            </div>
            {/* Column 3: Right-hand menu */}
            <nav className="rtMenuWrapper">
              <RightHandMenu />
            </nav>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
