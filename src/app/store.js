import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore(rootReducer);

export default store;