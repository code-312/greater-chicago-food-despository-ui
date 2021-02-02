import { configureStore } from '@reduxjs/toolkit';
import countyReducer from './countyReducer';
import filterReducer from './filterReducer';
import viewportReducer from './viewportReducer';
import zipReducer from './zipReducer';

//the listed keys under "reducer" are references to the different parts of state, passed as props to subscribed components
//thunk middleware is already included with configureStore - took out additional included middleware with getDefaultMiddleWare because it was slowing down dev environment
const store = configureStore({
    reducer: {
        illinois_counties: countyReducer,
        illinois_zipcodes: zipReducer,
        filters: filterReducer,
        viewport: viewportReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
        }),
});

export default store;