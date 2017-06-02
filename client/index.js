import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import createStore from './store/store.jsx'
import ReactDOM from 'react-dom'
import axios from 'axios'

import createHistory from 'history/createBrowserHistory'
import 'antd/dist/antd.css'
import './assets/css/utility.scss'
import './assets/css/main.scss'

import Main from './components/main'

const store = createStore()
const history = createHistory()
const reactComponent = (
  <Provider store={store} >
    <Main/>
  </Provider>
)
ReactDOM.render(reactComponent, document.getElementById('root'))
