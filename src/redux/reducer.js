import countyReducer from './countyReducer';
import filterReducer from './filterReducer';
import viewportReducer from './viewportReducer';
import zipReducer from './zipReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  illinois_counties: countyReducer,
  filters: filterReducer,
  viewport: viewportReducer,
  illinois_zipcodes: zipReducer
});

export default rootReducer