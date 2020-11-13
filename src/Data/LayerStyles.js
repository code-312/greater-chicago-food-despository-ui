/**
 * Layer styles determine how MapBox renders a Layer onto the base map.
 * 
 * Variable descriptions:
 * id = Used to filter or select a layer. 
 * type...  fill = layer object is outline and filled in
 *          line = layer object is outlined only
 * paint... 
 *      "fill" type:
 *          fill-color = color that fills in the layer object
 *          fill-opacity = how transparent the fill color is
 *          fill-outline-color = color of the outline
 *      "line" type:
 *          line-opacity = how transparent the outline is
 *          line-color = color of the outline
 *          line-width = width of outline
 */

 import {highlight, countyFill, countyOutline, zipcodeFill, zipcodeOutline} from './Colors'

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
};