import { createSlice } from '@reduxjs/toolkit';

export const initialFeatState = {
    selectedExtraDataFeat: null
}

// Slices create action types automatically, i.e. 'filters/updateFilters' and then execute reducers when those actions are dispatched
export const extraDataMenuSlice = createSlice({
    name: 'features',
    initialState: initialFeatState,
    reducers: {
        updateExtraDataFeat(state, action) {
            return {...state, ...action.payload};
        }
    }
});

export const { updateExtraDataFeat } = extraDataMenuSlice.actions;

export default extraDataMenuSlice.reducer;
