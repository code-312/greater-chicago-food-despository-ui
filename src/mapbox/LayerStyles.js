/**
 * Layer styles determine how MapBox renders a Layer onto the base map.
 * 
 * Variable descriptions:
 * id = Used to filter or select a layer. 
 * type...  fill = layer object is outline and filled in
 *          line = layer object is outlined only
 * 
 * Descriptions of layer styling:
 * https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
 */

 import {highlight, zipcodeFill, zipcodeOutline} from './Colors'

/**
 * Base styling for county layer objects
 */
export const county = {
    id: 'county',
    paint:{
    }
};

/**
 * Styling for selected county layer object (mouse is hovering over it)
 */
export const hoverCounty = {
    id: 'hoverCounty',
    type: 'line',
    paint:{
        "line-opacity": 0.75, 
        "line-color": highlight,
        "line-width": 3
    }
};

/**
 * Styling for selected county layer object (clicked)
 */
 export const selectedCounty = {
    id: 'selectedCounty',
    type: 'fill',
    paint:{
        'fill-color': highlight,
        "fill-opacity": 0.5, 
        "fill-outline-color": highlight
    }
};

/**
 * Base styling for zip-code layer objects
 */
export const zipcode = {
    id: 'zipcode',
    type: 'fill',
    paint:{
        'fill-color': zipcodeFill,
        "fill-opacity": 0.5, 
        "fill-outline-color": zipcodeOutline
    }
}

/**
 * Styling for selected zipcode layer object (mouse is hovering over it)
 */
export const selectedZipcode = {
    id: 'selectedZipcode',
    type: 'line',
    paint:{
        "line-opacity": 0.75, 
        "line-color": highlight,
        "line-width": 1
    }
};
