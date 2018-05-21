import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import videoReducer from './reducers/videos'
import { BrowserRouter as Router } from 'react-router-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import userReducer from './reducers/users'
import 'semantic-ui-css/semantic.min.css';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({userReducer, videoReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
