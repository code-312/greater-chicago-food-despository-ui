import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk makes API call, returns action of the type specified by the first parameter
// In the slice, extraReducers define different actions based on the 3 possible states of the returned promise and execute reducers for them
export const countyFetch = createAsyncThunk(
  'counties/countyFetch',
  //payload creator
  async () => {
    const url = "http://localhost:3001/counties"
    try {
      const res = await axios.get(url);
      return res.data; 
    } catch(err) {
        console.error("There was a problem fetching county data" + err);
        return [];
    }  
  }
);

// Then, handle actions in your reducers:
const countySlice = createSlice({
  name: 'counties',
  initialState: { counties: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [countyFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.counties = action.payload;
      }
    },
    [countyFetch.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [countyFetch.rejected]: (state, action) => {
      if(state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error
      }
    }
  }
});

export default countySlice.reducer;