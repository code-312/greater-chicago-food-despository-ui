import React from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

import { useDispatch, useSelector } from 'react-redux';
import { updateVP } from './../redux/viewportReducer';
import { updateFilters } from './../redux/filterReducer';
import {MapExtraDataMenu} from "../components/ExtraDataMenu/ExtraDataMenu"

import CountyLayer from './CountyLayer';
import ZipcodeLayer from './ZipcodeLayer';
import RenderToolTip from '../components/RenderToolTip';
import { navControlStyles } from './NavigationControlsStyles';



const Map = (props) => {
  const dispatch = useDispatch()
  /**
   * illinois_counties = County GeoJSON and county level data.
   * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
   * viewport = viewport showing map of current coordinate
   */
  const viewport = useSelector(state => state.viewport)
  const illinois_counties = useSelector(state => state.illinois_counties)
  const illinois_zipcodes = useSelector(state => state.illinois_zipcodes)
  const county_data = useSelector(state => state.county_data)
  const zip_data = useSelector(state => state.zip_data)
  

  //deletes are temporary fix to non-serialized values in Redux store
  // dispatch newViewPort to store
  const handleViewportChange = (newViewport) => {
    delete newViewport.transitionInterpolator;
    delete newViewport.transitionEasing;
    dispatch(updateVP(newViewport))
  }

  // grab features and coord where hovering and dispatch the data to store.
   /**
   * Updates the application's state based on the position of the mouse and the underlying features.
   * 
   * @param event = Information related to hover-event.
   * event.x,event.y = coordinates of mouse over the map
   * event.features = List of the features that are currently being hovered over. 
   */
  const onHover = event => {
    // Extract the list of features and x,y coords from the event
    const { features, srcEvent: {offsetX, offsetY} } = event
    
    // Select the feature and corresponding countyId from the list of features if one exists
    const countyFeature = features && features.find(f => f.layer.id === 'county')
    const zipCodeFeature = features && features.find(f => f.layer.id === 'zipcode')

    //this object is more condensed and contains only non-serialized values -  for Redux
    const currentCounty = countyFeature ? countyFeature.properties : null
    const currentZipCode = zipCodeFeature ? zipCodeFeature.properties : null

    // Given the currently hovered features, determine the zipcode and county filters:
    let zipcodeFilter = ''
    let county = ''
    let zipcode = ''
    if (currentCounty) {
      county = currentCounty.COUNTY;
      zipcodeFilter = currentCounty.STATE + county;
    }
    if (currentZipCode) {zipcode = currentZipCode.ZCTA}

    // Dispatch the updated information to the redux store
    dispatch(updateFilters({
      hoveredCounty: currentCounty || null, 
      hoveredZipCode: currentZipCode || null,
      x: offsetX, 
      y: offsetY, 
      highlightCounty: ['in', 'COUNTY', county],
      highlightZipcode: ['in', 'ZCTA', zipcode],
      filterZipcodeByCounty: ['in', 'COUNTY', zipcodeFilter]
    }));
  };

  const onClick = event => {
    // Extract the list of features and x,y coords from the event
    const { features } = event

    // Select the feature and corresponding countyId from the list of features if one exists
    const countyFeature = features && features.find(f => f.layer.id === 'county')
    const zipCodeFeature = features && features.find(f => f.layer.id === 'zipcode')

    //this object is more condensed and contains only non-serialized values -  for Redux
    const currentCounty = countyFeature ? countyFeature.properties : null
    const currentZipCode = zipCodeFeature ? zipCodeFeature.properties : null
    props.setSelectedCounty(currentCounty)
  }

    return (
      <ReactMapGL
      {...viewport}
      width='100%'
      height='100vh'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      onViewportChange={handleViewportChange}
      onHover={onHover}
      onClick={onClick}
      maxZoom={15}
      minZoom={5.5} >

        {/*County Level*/}
        {illinois_counties.status !== 'pending' && <CountyLayer />}
        {/*Zip-Code Level (only displays if zoom is greater than 7)*/}
        {viewport.zoom > 7 && illinois_zipcodes.status !== 'pending' && <ZipcodeLayer />} 
        
        {/*Tool-tip*/}
        <RenderToolTip />
        <MapExtraDataMenu
          title={"Show data for"}
          options={["option1", "option2", "option3"]}
          onChange={(selectedValue) => {
              console.log(selectedValue);
          }}
        />
    
        {/* Zoom +/- buttons */}
        <div style={navControlStyles}>
          <NavigationControl showCompass={false} />
        </div>
  
      </ReactMapGL>
    )
}

export default Map
