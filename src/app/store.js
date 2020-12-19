import { configureStore } from '@reduxjs/toolkit';
import countyReducer from './dataReducer';
import filterReducer from './filterReducer';
import viewportReducer from './viewportReducer';

//thunk middleware is already included with configureStore
const store = configureStore({
    reducer: {
        illinois_counties: countyReducer,
        //zipData: zipDataReducer,
        filters: filterReducer,
        viewport: viewportReducer
    }
    //add middleware here with 'middleware:' key
});

export default store;