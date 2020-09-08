import  {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css'
import reducer from './reducer';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';

const store = createStore(reducer);


  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById('root')
  );




