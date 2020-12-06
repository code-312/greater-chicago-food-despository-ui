import React from 'react';
import {LinearInterpolator, WebMercatorViewport} from 'react-map-gl';
import bbox from '@turf/bbox';
import ZoomToBoundsButton from './ZoomToBoundsButton';


const ZoomToBoundsMenu = ({currentViewport, countyFeatures, updateViewport}) => {
    const origin = {
        latitude: 40.150196,
        longitude: -89.367848, 
        zoom: 6,
    };
    var countyButtons = null;
    
    if (countyFeatures) {
        countyButtons = (countyFeatures) => {
            return countyFeatures.map((feature) => {
                const label = feature.properties.NAME + ' County';
                const [minLng, minLat, maxLng, maxLat] = bbox(feature); 
                const webMercatorViewport = new WebMercatorViewport(currentViewport);
                const {longitude, latitude, zoom} = webMercatorViewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {padding: 40});
                const newViewport = {
                    longitude: longitude, 
                    latitude: latitude, 
                    zoom: zoom
                };
                return (<ZoomToBoundsButton label={label} newViewport={newViewport} updateViewport={updateViewport}/>);
            })
        }
    }
    

    return (
        <div>
            <ZoomToBoundsButton label="County Map" newViewport={origin} updateViewport={updateViewport}/>
            {countyButtons(countyFeatures)}
        </div>
    )
}

export default ZoomToBoundsMenu;