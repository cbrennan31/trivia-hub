import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routes />, document.getElementById('app'));
})
