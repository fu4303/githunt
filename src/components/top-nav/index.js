import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

import './styles.css';

class TopNav extends React.Component {
  tweet = 'HitUP – Find Top Things in New Tab https://www.producthunt.com/posts/hitup';

  render() {
    // We need that to show the extension button only if not running in extension
    const isRunningExtension = window.chrome &&
      window.chrome.runtime &&
      window.chrome.runtime.id;

    return (
      <div className='top-nav'>
        <div className="container clearfix">
          <a href='https://github.com/wonderbeyond/HitUP'
             rel="noopener noreferrer"
             target='_blank'
             className="logo clearfix float-left">
             <img alt="logo" src={process.env.PUBLIC_URL + "/img/logo.svg"} />
          </a>
          <div className="logo-text">
            <h4>HitUP</h4>
            <p className="text-muted">Find to<span className="top-text"><span className="top-arrow"></span>p</span> things
            </p>
          </div>
          <div className="float-right nav-icon-links">
            <Link to="/comments"
              className="nav-link-item fa fa-comments"
              data-tip data-for="nav-link-discuss"
              rel="noopener noreferrer">
            </Link>
            <ReactTooltip id="nav-link-discuss" place="bottom">Let's discuss here</ReactTooltip>

            <a href='http://github.com/wonderbeyond/HitUP'
               className="nav-link-item fa fa-github"
               data-tip data-for="nav-link-github"
               target='_blank'
               rel="noopener noreferrer">
            </a>
            <ReactTooltip id="nav-link-github" place="bottom">View source on GitHub</ReactTooltip>

            {
              !isRunningExtension && (
                <a href='https://wonder.page.link/hitup-chrome'
                   className="nav-link-item fa fa-chrome"
                   data-tip data-for="nav-link-extension"
                   target='_blank'
                   rel="noopener noreferrer">
                </a>
              )
            }
            <ReactTooltip id="nav-link-extension" place="bottom">Get a browser extension</ReactTooltip>

            <a href={ `https://twitter.com/intent/tweet?text=${this.tweet}` }
               data-tip data-for="nav-link-tweet"
               target='_blank'
               rel="noopener noreferrer"
               className="nav-link-item fa fa-twitter">
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
