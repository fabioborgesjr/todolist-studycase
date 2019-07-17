import '../css/main.css'
import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import multi from 'redux-multi'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './components/main/App'

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'))