import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const countyFetch = createAsyncThunk(
  'counties/fetchCountyInfo',
  //payload creator callback parameter
  async () => {
    const url = "http://localhost:3001/counties"
    const res = await axios.get(url);
    return res.data;   
  }
);

// Then, handle actions in your reducers:
const countySlice = createSlice({
  name: 'counties',
  initialState: { counties: [], loading: 'idle', error: null },
  reducers: {
    updateCounties (state, action) {
      state.counties = action.payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [countyFetch.fulfilled]: (state, action) => {
      if(state.loading === 'pending'){
        state.loading = 'idle';
        state.counties = action.payload;
      }
    },
    [countyFetch.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [countyFetch.rejected]: (state, action) => {
      if(state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error
      }
    }
  }
});

export const { updateCounties } = countySlice.actions;

export default countySlice.reducer;