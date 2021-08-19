import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const metaDataFetch = createAsyncThunk('meta/metaDataFetch',
  async () => {
    console.log('pp')
    try {
      const res = await require('../fetched_data/metaData.json');
      return res;
    } catch(err) {
        console.error("There was a problem fetching meta data details: " + err);
        return [];
    }  
  }
);

const metaDataSlice = createSlice({
  name: 'meta',
  initialState: { meta: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    [metaDataFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.metaData = action.payload;
      }
    },
    [metaDataFetch.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [metaDataFetch.rejected]: (state, action) => {
      if(state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error
      }
    }
  }
});

export default metaDataSlice.reducer;
