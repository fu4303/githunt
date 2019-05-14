import 'custom-bootstrap.scss';
import 'global.scss';

import ReactGA from 'react-ga';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactGA.initialize('UA-134825122-1', { standardImplementation: true });
ReactDOM.render(<App/>, document.getElementById('root'));
