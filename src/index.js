import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { configureStore } from './configStore'
import { Provider } from "react-redux"
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const store = configureStore()


ReactDOM.render(
  <Provider store= { store }>
    <Router history= { history }>
      <Route path='/' component={App}/>
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
