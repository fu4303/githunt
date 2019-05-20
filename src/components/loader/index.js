import React from 'react';

import './styles.css';
import Sun from 'icons/sun';

const Loader = () => (
  <div className="loading-indicator" style={{height: '100vh'}}>
    <Sun className='spin'/>
  </div>
);

export default Loader;
