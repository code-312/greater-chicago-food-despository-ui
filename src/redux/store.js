import { configureStore, combineReducers } from '@reduxjs/toolkit';
import countyDataReducer from './countyDataReducer';
import countyReducer from './countyReducer';
import filterReducer from './filterReducer';
import viewportReducer from './viewportReducer';
import zipDataReducer from './zipCodeDataReducer';
import zipReducer from './zipReducer';
import selectedFeatReducer from './selectedFeatReducer'

//the listed keys under "reducer" are references to the different parts of state, passed as props to subscribed components
//thunk middleware is already included with configureStore - took out additional included middleware with getDefaultMiddleWare because it was slowing down dev environment
export const rootReducer = combineReducers({
  illinois_counties: countyReducer,
  filters: filterReducer,
  viewport: viewportReducer,
  illinois_zipcodes: zipReducer,
  county_data: countyDataReducer,
  zip_data: zipDataReducer,
  selectedFeat: selectedFeatReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
        },
        window.devToolsExtension ? window.devToolsExtension() : f => f),
});
/// To view the store within your browser download chrome extension: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

export default store;
