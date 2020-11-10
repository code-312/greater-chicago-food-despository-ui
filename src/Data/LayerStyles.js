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

 import {yellow, greenColorScale} from './Colors'

/**
 * Base styling for county layer objects
 */
export const county = {
    id: 'county',
    type: 'fill',
    paint:{
        'fill-color': {
            property: 'rangeValue',
            stops: [
            [0, greenColorScale[0]],
            [1, greenColorScale[1]],
            [2, greenColorScale[2]],
            [3, greenColorScale[3]],
            [4, greenColorScale[4]],
            [5, greenColorScale[5]],
            [6, greenColorScale[6]],
            [7, greenColorScale[7]],
            [8, greenColorScale[8]]]
        },
        "fill-opacity": 0.5, 
        "fill-outline-color": "#2e86c1"
    }
};

/**
 * Styling for selected county layer object (mouse is hovering over it)
 */
export const selectedCounty = {
    id: 'selectedCounty',
    type: 'line',
    paint:{
        "line-opacity": 0.5, 
        "line-color": yellow,
        "line-width": 5
    }
};

/**
 * Base styling for zip-code layer objects
 */
export const zipcode = {
    id: 'zipcode',
    type: 'fill',
    paint:{
        'fill-color': "#5dade2",
        "fill-opacity": 0.3, 
        "fill-outline-color": "#21618c"
    }
}