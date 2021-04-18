import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
/**
 * County demographic data fetched 4/12/21 and saved locally
 * to avoid exceeding Firebase data limits.  Data is updated
 * only once anually (date?), when it should be fetched again.
 */

export const countyDataFetch = createAsyncThunk(
  'counties/countyDataFetch',
  async () => {
    // const url = "https://cfc-gcfd-default-rtdb.firebaseio.com/county_data.json"
    try {
      // const res = await axios.get(url);
      // return res.data;
      const res = await require('../fetched_data/countyData.json');
      return res;
    } catch(err) {
        console.error("There was a problem fetching county data details: " + err);
        return [];
    }  
  }
);

const countyDataSlice = createSlice({
  name: 'countyData',
  initialState: { countyData: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    [countyDataFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.countyData = action.payload;
      }
    },
    [countyDataFetch.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [countyDataFetch.rejected]: (state, action) => {
      if(state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error
      }
    }
  }
});

export default countyDataSlice.reducer;
