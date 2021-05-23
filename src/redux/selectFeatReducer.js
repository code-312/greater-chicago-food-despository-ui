import { createSlice } from '@reduxjs/toolkit';

export const initialFeatState = {
    selectCounty: null,
    selectZipcode: null,
    filterFeat: 'poverty_data',
    filterSubFeat: null,
    featLabel: null
}

// Slices create action types automatically, i.e. 'filters/updateFilters' and then execute reducers when those actions are dispatched
export const selectFeatSlice = createSlice({
    name: 'features',
    initialState: initialFeatState,
    reducers: {
        updateSelectFeat(state, action) {
            return {...state, ...action.payload};
        }
    }
});

export const { updateSelectFeat } = selectFeatSlice.actions;

export default selectFeatSlice.reducer;
