import React from 'react';

import './styles.css';
import Sun from 'icons/sun';

const Loader = () => (
  <div className="loading-indicator">
    <Sun className='fa-spin'/>
  </div>
);

export default Loader;
