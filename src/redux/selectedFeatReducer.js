import { createSlice } from '@reduxjs/toolkit';

export const initialFeatState = {
    selectedCounty: null,
    selectedZipcode: null,
    selectedfilterFeat: 'poverty_data',
    selectedfilterSubfeat: 'poverty_population_total',
    selectedExtraDataFeat: null,
    featLabel: null
}

// Slices create action types automatically, i.e. 'filters/updateFilters' and then execute reducers when those actions are dispatched
export const selectedFeatSlice = createSlice({
    name: 'features',
    initialState: initialFeatState,
    reducers: {
        updateSelectedFeat(state, action) {
            return {...state, ...action.payload};
        }
    }
});

export const { updateSelectedFeat } = selectedFeatSlice.actions;

export default selectedFeatSlice.reducer;
