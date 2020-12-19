import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = {
    highlightCounty: ['in', 'COUNTY', ''],
    highlightZipcode: ['in', 'ZCTA', ''],
    filterZipcodeByCounty: ['in', 'COUNTY', ''],
    x: null,
    y: null,
    hoveredCounty: null,
    hoveredZipCode: null
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState: initialFilterState,
    reducers: {
        updateFilters(state, action) {
            return {...state, ...action.payload};
        }
    }
});

export const { updateFilters } = filterSlice.actions;

export default filterSlice.reducer;