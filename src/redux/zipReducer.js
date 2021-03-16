import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk makes API call, returns action of the type specified by the first parameter
// In the slice, extraReducers define different actions based on the 3 possible states of the returned promise and execute reducers for them
export const zipFetch = createAsyncThunk(
  'zipcodes/zipFetch',
  //payload creator
  async () => {
    const url = "https://cfc-gcfd-default-rtdb.firebaseio.com/zipcodes.json"
    try {
      const res = await axios.get(url);
      return res.data; 
    } catch(err) {
        console.error("There was a problem fetching zipcode data" + err);
        return {}
    }  
  }
);

// Then, handle actions in your reducers:
const zipSlice = createSlice({
  name: 'zipcodes',
  initialState: { zipcodes: {}, status: 'idle', error: null },
  reducers: {
    // 
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [zipFetch.fulfilled]: (state, action) => {
      if(state.status === 'pending'){
        state.status = 'idle';
        state.zipcodes = action.payload;
      }
    },
    [zipFetch.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [zipFetch.rejected]: (state, action) => {
      if(state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error
      }
    }
  }
});

export default zipSlice.reducer;
