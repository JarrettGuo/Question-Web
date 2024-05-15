import React from 'react'
import { render } from 'preact'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
// import './index.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')!
)
