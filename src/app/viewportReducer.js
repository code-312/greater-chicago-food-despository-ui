import { createSlice } from '@reduxjs/toolkit';
import { FlyToInterpolator } from 'react-map-gl';

const initialVPState = {
    latitude: 40.150196,
    longitude: -89.367848, 
    zoom: 6,
    width: window.innerWidth/2,
    height: window.innerHeight,
    //transitionInterpolator: new FlyToInterpolator(),
    //transitionDuration: 1000
  }

export const viewportSlice = createSlice({
    name: 'viewport',
    initialState: initialVPState,
    reducers: {
        updateVP(state, action) {
            const { latitude, longitude, zoom } = action.payload;
            return {...state, latitude, longitude, zoom};
        }
    }
});

export const { updateVP } = viewportSlice.actions;

export default viewportSlice.reducer;