import ReactGA from 'react-ga';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import './global.css';
import App from './app';

ReactGA.initialize('UA-134825122-1', { standardImplementation: true });
ReactDOM.render(<App/>, document.getElementById('root'));
