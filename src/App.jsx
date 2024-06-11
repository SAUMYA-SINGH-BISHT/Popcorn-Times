// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/AppStore'

function App() {

  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  )
}

export default App
