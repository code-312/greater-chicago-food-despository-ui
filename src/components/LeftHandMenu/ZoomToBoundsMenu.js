import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVP } from '../../redux/viewportReducer';
import { updateSelectedFeat } from '../../redux/selectedFeatReducer';
import {updateViewportToFitBounds} from '../../mapbox/Util';

import './ZoomToBoundsMenu.css'

/**
 * COMPONENT: ZoomToBoundsMenu
 */
const ZoomToBoundsMenu = () => {
    //useSelector gets viewport state from Redux store
    const currentViewport = useSelector(state => state.viewport);
    
    const origin = {
        latitude: 40.150196,
        longitude: -89.367848, 
        zoom: 6,
    };

    /**
   * Selector function
   * Returns a list of the county GeoJSON features
   */
   const countyFeatures = useSelector(state => {
       const { counties } = state.illinois_counties;
        if(Object.keys(counties).length !== 0) {
            let { features } = counties;
            const sortedCountyFeatures = [...features].sort((a,b) => (a.properties.NAME > b.properties.NAME) ? 1 : -1);
            return sortedCountyFeatures;
        }
        return [];
    });

    /**
     * Maps a list of GeoJSOn features to a list of ZoomToBoundsButton components
     * @param countyFeatures => list of GeoJSON features (expected to be counties)
     */
    var countyButtons = (countyFeatures) => {
        if (countyFeatures) {
            return countyFeatures.map((feature) => {
                const label = feature.properties.NAME + ' County';
                const newViewport = updateViewportToFitBounds(currentViewport,feature);
                const countyID = feature.properties.STATE + feature.properties.COUNTY
                return (<ZoomToBoundsButton 
                    key={feature.properties.NAME} 
                    keyValue={feature.properties.NAME}
                    countyID={countyID}
                    label={label} newViewport={newViewport} 
                />);
            })
        } 
        return null;
    }
    
    // Returns a button to re-orientate the map around the state, followed by an alphabetized 
    // list of buttons that re-orientate the map around a county
    return (
        <div className="county-list">
            <ZoomToBoundsButton 
                key="Illinois" 
                keyValue="Illinois"
                label="Select a County" 
                newViewport={origin} 
            />
            <div className="scroll">
                {countyButtons(countyFeatures)}
            </div>    
        </div>
    )
}
export default ZoomToBoundsMenu;


/**
 * COMPONENT: ZoomToBoundsButton
 * 
 * @param {String} keyValue => Used to identify buttons
 * @param {String} label => Text label for the button
 * @param newViewport => parameter 
 */
export const ZoomToBoundsButton = ({keyValue, label, newViewport, countyID}) => {
    const dispatch = useDispatch();
    const selectedFeat = useSelector(state => state.selectedFeat)

    const onZoomToBoundsButtonClick = (vp, keyValue, countyID) => {
        const currentCounty = {
            name: keyValue, 
            id: countyID
            } 
        dispatch(updateVP(vp));
        dispatch(updateSelectedFeat({...selectedFeat, ...{
            selectedCounty: currentCounty
          }}));
    }
    return (
        <button
            onClick={() => onZoomToBoundsButtonClick(newViewport, keyValue, countyID)}
            data-testid={"zoom_to_bounds_button_" + keyValue}
        >{label}</button>
    )
}
