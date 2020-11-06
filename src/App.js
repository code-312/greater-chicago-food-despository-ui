import './App.css';
import React, {Component} from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import illinois_counties from './illinois_counties.json';
import illinois_zipcodes from './illinois_zipcodes.json'
import {county, selectedCounty, zipcode} from './LayerStyles';

class App extends Component {
  state = {
    data: null,
    filter: ['in', 'COUNTY', ''],
    viewport: {
      latitude: 40.150196,
      longitude: -89.367848, 
      zoom: 6,
      width: "50vw",
      height: "100vh"
    },
    x: null,
    y: null,
    hoveredFeature: null
  }

  componentDidMount() {
    // API Call to get data (not implemented yet)
    this.setState({data: this.loadCensusAreaRange(illinois_counties)})
  }

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


  onHover = event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'county');
    var countyId = '';
    if (hoveredFeature) {
      countyId = hoveredFeature.properties.COUNTY;
    }
    this.setState({hoveredFeature: hoveredFeature, x: offsetX, y: offsetY, filter: ['in', 'COUNTY', countyId]});
    console.log(this.state);
  };

  renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>County: {hoveredFeature.properties.NAME}</div>
          <div>FIPS: {hoveredFeature.properties.COUNTY}</div>
          <div>Area square miles: {hoveredFeature.properties.CENSUSAREA}</div>
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
          <Source id="counties" type="geojson" data={this.state.data}>
            <Layer {...county}></Layer>
            <Layer {...selectedCounty} filter={this.state.filter}></Layer>
          </Source>
          
          {this.state.viewport.zoom > 7 && (
            <Source id="zipcodes" type="geojson" data={illinois_zipcodes}>
              <Layer {...zipcode}></Layer>
            </Source>
          )} 
          
          {this.renderTooltip()} 
          
        </ReactMapGL>
      </div>
    );
  }
}

export default App;