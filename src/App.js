import './App.css';
import React, {Component} from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import illinois_counties from './GeoJSON/illinois_counties.json';
import illinois_zipcodes from './GeoJSON/illinois_zipcodes.json'
import {county, selectedCounty, zipcode} from './GeoJSON/LayerStyles';


export default class App extends Component {
  /**
   * State of the app. 
   * 
   * illinois_counties = County GeoJSON and county level data.
   * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
   * countyFilter = MapBox filter, used to select the couny that the mouse is hovered on
   * viewport = Determines the size of the map, and initial centered position and zoom-level
   * x,y = current location of mouse over the map
   * hoveredCounty = county layer object, currently being hovered over by the mouse
   */
  state = {
    illinois_counties: null,
    illinois_zipcodes: null,
    countyFilter: ['in', 'COUNTY', ''],
    viewport: {
      latitude: 40.150196,
      longitude: -89.367848, 
      zoom: 6,
      width: "50vw",
      height: "100vh"
    },
    x: null,
    y: null,
    hoveredCounty: null
  }

  
  componentDidMount() {
    // TODO: API Call to get data (not implemented yet)
    this.setState({illinois_counties: this.loadCensusAreaRange(illinois_counties)})
    this.setState({illinois_zipcodes: illinois_zipcodes})
  }

  /**
   * For Proof-of-Concept purposes only
   * @param {*} featureCollection 
   */
  loadCensusAreaRange(featureCollection) {
    const {features} = featureCollection;
    return {
      type: 'FeatureCollection',
      features: features.map(f => {
        var rangeValue;
        if (f.properties.CENSUSAREA <= 200.0) {
          rangeValue = 0;
        } else if (f.properties.CENSUSAREA <= 300.0) {
          rangeValue = 1;
        } else if (f.properties.CENSUSAREA <= 400.0) {
          rangeValue = 2;
        } else if (f.properties.CENSUSAREA <= 500.0) {
          rangeValue = 3;
        } else if (f.properties.CENSUSAREA <= 600.0) {
          rangeValue = 4;
        } else if (f.properties.CENSUSAREA <= 700.0) {
          rangeValue = 5;
        } else if (f.properties.CENSUSAREA <= 800.0) {
          rangeValue = 6;
        } else if (f.properties.CENSUSAREA <= 900.0) {
          rangeValue = 7
        } else if (f.properties.CENSUSAREA > 900.0) {
          rangeValue = 8;
        }
        const properties = {
          ...f.properties,
          rangeValue: rangeValue
        };
        return {...f, properties};
      })
    };
  }

  /**
   * onHover - Called by ReactMapGL's onHover function.
   * @param event - Contains x,y coordinates of mouse over the map, as well as a list
   * of the features that it is hovering over. 
   * 
   * At the moment -> This function sets the 'x','y' coords in state based on the event parameter,
   * and if their is a hovered feature with a 'county' id, then the 'hoveredCounty' in state is 
   * updated to match the given one.
   */
  onHover = event => {
    // Extract the list of features and x,y coords from the event parameter
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;

    // Select the feature and corresponding countyId from the list of features if one exists
    const hoveredFeature = features && features.find(f => f.layer.id === 'county');
    var countyId = '';
    if (hoveredFeature) {
      countyId = hoveredFeature.properties.COUNTY;
    }
    // Set state with the updated information
    this.setState({hoveredCounty: hoveredFeature, x: offsetX, y: offsetY, countyFilter: ['in', 'COUNTY', countyId]});
  };


  /**
   * Returns a component that displays some county information for the currently hovered county
   */
  renderTooltip() {
    const {hoveredCounty, x, y} = this.state;

    return (
      // Only returns the tool tip if there is a currently hovered county
      hoveredCounty && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>County: {hoveredCounty.properties.NAME}</div>
          <div>FIPS: {hoveredCounty.properties.COUNTY}</div>
          <div>Area square miles: {hoveredCounty.properties.CENSUSAREA}</div>
        </div>
      )
    );
  }

  render() {
    return (
      <div className="App">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={"pk.eyJ1IjoiZWdhYnJpZWxzZSIsImEiOiJja2d2ZDZua2QwMWI3M2JwajA0Z3lqbDdmIn0.sAaMKjFMEglTFxZwKyU75Q"}
          onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
          onHover={this.onHover}
        >
          {/*County Level*/}
          <Source id="counties" type="geojson" data={this.state.illinois_counties}>
            <Layer {...county}></Layer>
            <Layer {...selectedCounty} filter={this.state.countyFilter}></Layer>
          </Source>
          
          {/*Zip-Code Level (only displays if zoom is greater than 7)*/}
          {this.state.viewport.zoom > 7 && (
            <Source id="zipcodes" type="geojson" data={this.state.illinois_zipcodes}>
              <Layer {...zipcode}></Layer>
            </Source>
          )} 
          
          {/*Tool-tip*/}
          {this.renderTooltip()} 
        </ReactMapGL>
      </div>
    );
  }
}