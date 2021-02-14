import React, {Component} from 'react';
import '../App.css';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import ZoomToBoundsMenu from '../components/ZoomToBoundsMenu';
import {county, selectedCounty, zipcode, selectedZipcode} from './LayerStyles';
import { connect } from 'react-redux';
import { updateVP } from '../redux/viewportReducer';
import { updateFilters } from '../redux/filterReducer';
import { countyFetch } from '../redux/countyReducer';
import { zipFetch } from '../redux/zipReducer';

//these props are passed to the App component
const mapStateToProps = state => {
  const { viewport, filters, illinois_counties, illinois_zipcodes } = state;
  return { viewport, filters, illinois_counties, illinois_zipcodes }
}
/**
 * Main component of the application. 
 * 
 * NOTE: Currently, this component renders the MapBox map directly. 
 * As the application grows, it will be important to extract the map into its own component.
 */
class App extends Component {
  /**
   * illinois_counties = County GeoJSON and county level data.
   * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
   */

   constructor(props) {
     super(props);
   }
  
  /**
   * Fires before "constructor" and "getDerivedStateFromProps" methods, but after the "render" method.
   */
  componentDidMount() {
    //props.dispatch sends updated viewport information to Redux store 
    //dispatch is added to props automatically when connect is used without mapDispatchToProps
    //countyFetch and zipFetch are both async thunks from countyReducer.js and zipReducer.js, respectively
    //They dispatch the most current API call to the Redux store
    this.props.dispatch(countyFetch());
    this.props.dispatch(zipFetch());
  }

  /**
   * Called by ReactMapGL's onHover function when the mouse hovers over the MapBox map.
   * Updates the application's state based on the position of the mouse and the underlying features.
   * 
   * @param event = Information related to hover-event.
   * event.x,event.y = coordinates of mouse over the map
   * event.features = List of the features that are currently being hovered over. 
   */
  onHover = event => {
    // Extract the list of features and x,y coords from the event parameter
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    
    // Select the feature and corresponding countyId from the list of features if one exists
    const countyFeature = features && features.find(f => f.layer.id === 'county');
    const zipCodeFeature = features && features.find(f => f.layer.id === 'zipcode');

    //this object is more condensed and contains only non-serialized values -  for Redux
    const currentCounty = countyFeature ? countyFeature.properties : null;
    const currentZipCode = zipCodeFeature ? zipCodeFeature.properties : null;

    // Given the currently hovered features, determine the zipcode and county filters:
    let zipcodeFilter = '';
    let county = '';
    let zipcode = '';
    if (currentCounty) {
      county = currentCounty.COUNTY;
      zipcodeFilter = currentCounty.STATE + county;
    }
    if (currentZipCode) {zipcode = currentZipCode.ZCTA}

    // Dispatch the updated information to the redux store
    this.props.dispatch(updateFilters({
      hoveredCounty: currentCounty || null, 
      hoveredZipCode: currentZipCode || null,
      x: offsetX, 
      y: offsetY, 
      highlightCounty: ['in', 'COUNTY', county],
      highlightZipcode: ['in', 'ZCTA', zipcode],
      filterZipcodeByCounty: ['in', 'COUNTY', zipcodeFilter]
    }));
  };


  /**
   * Returns a component that displays: the county name, and FIPS number.
   * If a zipcode is also highlighted, then also displays zipcode number.
   */
  renderTooltip() {
    const {hoveredCounty, hoveredZipCode, x, y} = this.props.filters;
    const style = {
      position:'absolute',
      margin: 8,
      padding: 4,
      backgroundColor: 'lightgray',
      maxWidth: 300,
      fontSize: 10,
      zIndex: 9,
      pointerEvents: 'none',
      left: x,
      top: y
    }

    return (
      // Only returns the tool tip if there is a currently hovered county
      hoveredCounty && (
        <div style={style}>
          <div>County: {hoveredCounty.NAME}</div>
          <div>FIPS: {hoveredCounty.COUNTY}</div>
          {hoveredZipCode != null &&
            <div>Zipcode: {hoveredZipCode.ZCTA}</div>
          }
        </div>
      )
    );
  }

  /**
   * Fires after the "constructor" and "getDerivedStateFromProps" methods, but before "componentDidMount."
   * Returns the HTML object to be rendered by App component.
   */
  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          {/*Column 1: Left-hand menu (Zoom Control)*/}
          <nav className="col-md-2 pl-0 pr-0">
            <ZoomToBoundsMenu /> 
          </nav>

          {/*Column 2: MapBox map */}
          <div className="col-md-6 pl-0 pr-0">
            <ReactMapGL
              {...this.props.viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
              //deletes are temporary fix to non-serialized values in Redux store
              onViewportChange={(newViewport) => {
                delete newViewport.transitionInterpolator;
                delete newViewport.transitionEasing;
                this.props.dispatch(updateVP(newViewport))
              }}
              onHover={this.onHover}
            >
              {/*County Level*/}
              <Source id="counties" type="geojson" data={this.props.illinois_counties.counties}>
                <Layer {...county}></Layer>
                <Layer {...selectedCounty} filter={this.props.filters.highlightCounty}></Layer>
              </Source>
              
              {/*Zip-Code Level (only displays if zoom is greater than 7)*/}
              {this.props.viewport.zoom > 7 && (
                <Source id="zipcodes" type="geojson" data={this.props.illinois_zipcodes.zipcodes}>
                  <Layer {...zipcode} filter={this.props.filters.filterZipcodeByCounty}></Layer>
                  <Layer {...selectedZipcode} filter={this.props.filters.highlightZipcode}></Layer>
                </Source>
              )} 
              
              {/*Tool-tip*/}
              {this.renderTooltip()} 
            </ReactMapGL>
          </div>

          {/*Column 3: Right-hand menu*/}
          <div className="col-md-4 pl-0 pr-0">
            RightHandMenu
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);