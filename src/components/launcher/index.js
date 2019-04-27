import React from 'react';

import './styles.css';

const Launcher = () => (
  <div className="page-placeholder" style={{
    background: `url("${process.env.PUBLIC_URL}/img/logo.svg") no-repeat 50% 30%/100px`,
    width: '100vw',
    height: '100vh',
    animation: '4s infinite fadein'
  }}></div>
);

export default Launcher;
