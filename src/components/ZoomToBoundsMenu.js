import React from 'react';
import {updateViewportToFitBounds} from '../mapbox/Util';

/**
 * ZoomToBoundsMenu
 * 
 * @param currentViewport 
 * @param countyFeatures 
 * @param updateViewport 
 */
const ZoomToBoundsMenu = ({currentViewport, countyFeatures, updateViewport}) => {
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
    
                return (<ZoomToBoundsButton label={label} newViewport={newViewport} updateViewport={updateViewport}/>);
            })
        } else {
            return null;
        }
    }
    
    return (
        <div>
            <div>
                <ZoomToBoundsButton label="County Map" newViewport={origin} updateViewport={updateViewport}/>
            </div>
            <div style={{display:"flex", flexDirection:'column', overflowY:'auto', maxHeight:300}}>
                {countyButtons(countyFeatures)}
            </div>    
        </div>
    )
}
export default ZoomToBoundsMenu;


/**
 * ZoomToBoundsButton
 * 
 * @param {String} label 
 * @param newViewport
 * @param {Function} updateViewport
 */
export const ZoomToBoundsButton = ({label, newViewport, updateViewport}) => {

    return (
        <button
            className="zoom_button"
            style={styles.zoom_button}
            onClick={() => updateViewport(newViewport)}
            data-testid={"zoom_to_bounds_button: " + label}
        >{label}</button>
    )
}

/**
 * In-line styles for ZoomToBounds components
 */
const styles = {
    zoom_button: {
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        padding:10,
    },
}