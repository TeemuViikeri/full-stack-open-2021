import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  // Provider makes the store availabe to <App />
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
