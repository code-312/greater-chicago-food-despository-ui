import { createSlice } from '@reduxjs/toolkit';

export const initialVPState = {
    latitude: 40.150196,
    longitude: -89.367848, 
    zoom: 6,
    // height and width of viewport override by map's height and width in Map component
    width: window.innerWidth,
    height: window.innerHeight,
  }

export const viewportSlice = createSlice({
    name: 'viewport',
    initialState: initialVPState,
    reducers: {
        updateVP(state, action) {
            const { latitude, longitude, zoom } = action.payload;
            return {
                ...state,
                latitude,
                longitude,
                zoom: maxMinZoom(zoom, {...state})
            };
        }
    }
});

// Confine zoom within maxZoom(15), minZoom(5.5), each button cause 0.5 increase or decrease in zoom level 
export const maxMinZoom = (zoom, state) => {
    let zoomUpdate = 0
    if(zoom > 15) {
        zoomUpdate = 15
    } else if (zoom < 5.5) {
        zoomUpdate = 5.5
    } else if ((zoom - state.zoom) === 1) {
        zoomUpdate = zoom - 0.5
    } else if ((zoom - state.zoom) === -1) {
        zoomUpdate = zoom + 0.5
    } else {
        zoomUpdate = zoom
    }
    return zoomUpdate
}

export const { updateVP } = viewportSlice.actions;

export default viewportSlice.reducer;
