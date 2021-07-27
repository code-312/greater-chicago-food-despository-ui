import bbox from '@turf/bbox';
import { WebMercatorViewport } from 'react-map-gl';


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
      zoom: zoom - 2
    };
}