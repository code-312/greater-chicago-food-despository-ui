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

 import {highlight, countyFill, countyOutline, zipcodeFill, zipcodeOutline, colorMapFill} from './Colors'

/**
 * Base styling for county layer objects
 */
export const county = {
    id: 'county',
    type: 'fill',
    paint:{
        'fill-color': countyFill,
        "fill-opacity": 0.5, 
        "fill-outline-color": countyOutline
    }
};

/**
 * Styling for selected county layer object (mouse is hovering over it)
 */
export const selectedCounty = {
    id: 'selectedCounty',
    type: 'line',
    paint:{
        "line-opacity": 0.75, 
        "line-color": highlight,
        "line-width": 3
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
}

export const colorMap = {
    id: 'colorMap',
    type: 'fill',
    paint: {
        'fill-color': {
          property: 'percentile',
          stops: colorMapFill,
        },
        'fill-opacity': 0.8
    }
}
