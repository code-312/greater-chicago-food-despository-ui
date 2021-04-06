import bbox from '@turf/bbox';
import { WebMercatorViewport } from 'react-map-gl';
import {range} from 'd3-array'
import {scaleQuantile} from 'd3-scale'

/**
  * updateViewportToFitBounds
  * 
  * Using bbox (https://www.npmjs.com/package/@turf/bbox) creates a 
  * MapBox viewport that bounds the given GeoJSON feature.
  * 
  * @param currentViewport => current viewport of a MapBox map
  * @param feature => GeoJSON feature to be bounded
  * @returns MapBox viewport that fits to the bounds of the feature passed.
  */
export const updateViewportToFitBounds = (currentViewport, feature) => {
    const [minLng, minLat, maxLng, maxLat] = bbox(feature); 
    const webMercatorViewport = new WebMercatorViewport(currentViewport);
    const {longitude, latitude, zoom} = webMercatorViewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {padding: 40});
    return {
      longitude: longitude,
      latitude: latitude,
      zoom: zoom
    };
}


/**
 * creates a scale range for selected feature, adds it to countyData and returns final renderObj to feed into geoJSON to render chloropleth map
 *  @param countyData => county features data received from backend, poverty and race data
 *  @param counties => county geometry data
 *  @returns object with both data combined and a scaled value of selected feature based on which geoJSON will be created
 * */ 
export function updateScaleInterval(countyData, counties) {
  const scale = scaleQuantile().domain(createFeatureArray(countyData)).range(range(9))
  return combineData(countyData, counties, scale)
}

// return an Array with just the selected features required to create a scale range
function createFeatureArray (countyData) {
  let selectedFeatureData = []
  for (const keys in countyData) {
    selectedFeatureData.push(countyData[keys].poverty_data.poverty_population_total)
  }
  return selectedFeatureData
}

/**
 * Adds scaled value of selected feature to county object and combined it with its respective geometry data
 *  @param countyDataObj => county features data received from backend, poverty and race data
 *  @param counties => county geometry data
 *  @param scale => scaled value of the selected feature
 *  @returns object with scaled value of selected feature added to county object and combined with its respective geometry data
 * */ 
function combineData(countyDataObj, counties, scale) {
  let renderObj = {}
  let feat = []
  for (const keys in countyDataObj) {
    let value = countyDataObj[keys].poverty_data.poverty_population_total
    const scaleAddedObj = {...countyDataObj[keys], value, percentile: scale(value)}
    renderObj[keys] = scaleAddedObj
  }
  counties.features.map(county => {
    let key = '17' + county.properties.COUNTY
    let properties =  {...county.properties, ...renderObj[key]}
    feat.push({...county, properties})
  })
  return {
    "features": feat,
    "type": "FeatureCollection"
  }
}
