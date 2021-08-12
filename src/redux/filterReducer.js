import { createSlice } from '@reduxjs/toolkit';

export const initialFilterState = {
    selectedCounty: ['in', 'COUNTY', ''],
    highlightCounty: ['in', 'COUNTY', ''],
    highlightZipcode: ['in', 'ZCTA', ''],
    filterZipcodeByCounty: ['in', 'COUNTY', ''],
    x: null,
    y: null,
    hoveredCounty: null,
    hoveredZipCode: null
}

// Slices create action types automatically, i.e. 'filters/updateFilters' and then execute reducers when those actions are dispatched
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
