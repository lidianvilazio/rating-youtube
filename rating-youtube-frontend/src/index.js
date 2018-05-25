import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import userReducer from './reducers/users'
import 'semantic-ui-css/semantic.min.css';
import thunk from 'redux-thunk'
// import {ActionCableProvider} from 'react-actioncable-provider'
// <ActionCableProvider url={API_WS_ROOT}></ActionCableProvider>

// const API_WS_ROOT = 'ws://localhost:3000/cable'

const rootReducer = combineReducers({userReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(<Router><Provider store={store}><App/></Provider></Router>, document.getElementById('root'));
