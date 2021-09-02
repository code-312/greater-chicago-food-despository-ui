import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Import reducers
import { rootReducer } from './redux/store'

function render (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function reduxRender (
    element,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    } = {}
) {
    return rtlRender(<Provider store={store}>{element}</Provider>)
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render, reduxRender }
