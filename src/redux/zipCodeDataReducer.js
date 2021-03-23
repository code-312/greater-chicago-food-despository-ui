import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const zipDataFetch = createAsyncThunk(
  'zipcodes/zipDataFetch',
  async () => {
    const url = "https://cfc-gcfd-default-rtdb.firebaseio.com/zip_data.json"
    try {
      const res = await axios.get(url);
      return res.data; 
    } catch(err) {
        console.error("There was a problem fetching zipcode data details: " + err);
        return [];
    }  
  }
);

const zipDataSlice = createSlice({
  name: 'zipData',
  initialState: { zipData: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    [zipDataFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.zipData = action.payload;
      }
    },
    [zipDataFetch.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [zipDataFetch.rejected]: (state, action) => {
      if(state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error
      }
    }
  }
});

export default zipDataSlice.reducer;
