import { createSlice } from '@reduxjs/toolkit';

export const initialSelectFeatState = ''

export const selectFeatSlice = createSlice({
    name: 'selectFeat',
    initialState: initialSelectFeatState,
    reducers: {
        updateSelectFeat(state, action) {
            state = action.payload
            return state
        }
    }
});

export const { updateSelectFeat } = selectFeatSlice.actions;

export default selectFeatSlice.reducer;
