import { configureStore, combineReducers } from '@reduxjs/toolkit';

import filterReducer from './filterReducer';
import viewportReducer from './viewportReducer';
import selectedFeatReducer from './selectedFeatReducer'
import extraDataMenuReducer from './extraDataMenuReducer';

//the listed keys under "reducer" are references to the different parts of state, passed as props to subscribed components
//thunk middleware is already included with configureStore - took out additional included middleware with getDefaultMiddleWare because it was slowing down dev environment
export const rootReducer = combineReducers({

  filters: filterReducer,
  viewport: viewportReducer,
  selectedFeat: selectedFeatReducer,
  extraDataMenuFeat: extraDataMenuReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
        },
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f),
});
/// To view the store within your browser download chrome extension: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

export default store;
