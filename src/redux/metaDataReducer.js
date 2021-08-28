import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const metaDataFetch = createAsyncThunk(
  'metadata/metaDataFetch',
  async () => {
    try {
      console.log('async ')
      return await require('../fetched_data/metaData.json');
    } catch(err) {
        console.error("There was a problem fetching county data: " + err);
        return [];
    }  
  }
);

const metaDataSlice = createSlice({
  name: 'metadata',
  initialState: { meta: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    [metaDataFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.meta = action.payload;
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

