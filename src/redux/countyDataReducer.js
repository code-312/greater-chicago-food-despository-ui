import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const countyDataFetch = createAsyncThunk(
  'counties/countyDataFetch',
  async () => {
    const url = "https://cfc-gcfd-default-rtdb.firebaseio.com/county_data.json"
    try {
      const res = await axios.get(url);
      return res.data; 
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
