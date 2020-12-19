import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVP } from '../app/viewportReducer';
import {updateViewportToFitBounds} from '../mapbox/Util';

/**
 * COMPONENT: ZoomToBoundsMenu
 * @param countyFeatures 
 */
const ZoomToBoundsMenu = ({countyFeatures}) => {
    //useSelector gets viewport state from Redux store
    const useCurrentViewport = () => useSelector(state => state.viewport);
    const currentViewport = useCurrentViewport();
    
    const origin = {
        latitude: 40.150196,
        longitude: -89.367848, 
        zoom: 6,
    };

    /**
     * Maps a list of GeoJSOn features to a list of ZoomToBoundsButton components
     * @param countyFeatures => list of GeoJSON features (expected to be counties)
     */
    var countyButtons = (countyFeatures) => {
        if (countyFeatures) {
            return countyFeatures.map((feature) => {
                const label = feature.properties.NAME + ' County';
                const newViewport = updateViewportToFitBounds(currentViewport,feature);
                
                return (<ZoomToBoundsButton 
                    key={feature.properties.NAME} 
                    keyValue={feature.properties.NAME}
                    label={label} newViewport={newViewport} 
                />);
            })
        } else {
            return null;
        }
    }
    
    // Returns a button to re-orientate the map around the state, followed by an alphabetized 
    // list of buttons that re-orientate the map around a county
    return (
        <div style={styles.zoom_menu}>
            <ZoomToBoundsButton 
                key="Illinois" 
                keyValue="Illinois"
                label="County Map" 
                newViewport={origin} 
            />
            <div style={styles.button_scroll_bar}>
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
export const ZoomToBoundsButton = ({keyValue, label, newViewport}) => {
    const dispatch = useDispatch();
    const updateViewport = (vp) => dispatch(updateVP(vp));
    return (
        <button
            style={styles.zoom_button}
            onClick={() => updateViewport(newViewport)}
            data-testid={"zoom_to_bounds_button_" + keyValue}
        >{label}</button>
    )
}

/**
 * In-line styles for ZoomToBounds components
 */
const styles = {
    zoom_button: {
        display:"flex",
        flexDirection:'column',
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        padding:10,
    },

    zoom_menu: {
        display:"flex",
        flexDirection:'column',
        maxHeight:'100vh',
    },

    button_scroll_bar: {
        display:'flex',
        flexDirection:'column',
        overflowY:'scroll',
    }
}