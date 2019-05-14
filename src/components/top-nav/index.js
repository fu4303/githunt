import React from 'react';
import { connect } from 'react-redux';
import ToggleTheme from 'icons/toggle-theme';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import {GemmyClient} from 'gemmy-client';
import snarkdown from 'snarkdown';
import { setColorTheme } from 'redux/preference/actions';
import {toggleSideBar} from 'components/sidebar/sidebar-toggle-bus';
import {ReactComponent as Heart} from 'icons/heart-solid.svg';
import {ReactComponent as GitHub} from 'icons/github-brands.svg';
import {ReactComponent as Twitter} from 'icons/twitter-brands.svg';
import {ReactComponent as Chrome} from 'icons/chrome-brands.svg';
import {ReactComponent as Comments} from 'icons/comments-solid.svg';
import {ReactComponent as Bars} from 'icons/bars-solid.svg';

import './styles.scss';

class TopNav extends React.Component {
  tweet = `HitUP – a Chrome extension help you find top things in New Tab
  https://github.com/wonderbeyond/HitUP
  `;

  constructor(props) {
    super(props);
    this.state = {
      hitGem: ''
    }
  }

  componentDidMount() {
    setTimeout(async () => {
      let gmc = new GemmyClient()
      let hitGem = await gmc.randomGet()
      this.setState({hitGem: hitGem});
    }, 0);
  }

  toggleTheme = () => {
    let prev = this.props.theme;
    let right = (prev === 'light'? 'dark': 'light');
    console.log(`Toggling color theme from ${prev} to ${right}`);
    this.props.setColorTheme(right);
  }

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
          <div title="Toggle theme" className="theme-toggle" onClick={this.toggleTheme}><ToggleTheme/></div>

          <span title="Open setttings" className="float-right sidebar-toggle"
            onClick={toggleSideBar}>
            <Bars width="18" height="18" />
          </span>

          <div className="float-right nav-icon-links">
            {
              isRunningExtension && (
                <a href='https://chrome.google.com/webstore/detail/hitup-find-top-things/eiokaohkigpbonodjcbjpecbnccijkjb'
                   className="nav-link-item"
                   data-tip data-for="nav-link-rate"
                   target='_blank'
                   rel="noopener noreferrer">
                   <Heart width="18" height="18" />
                </a>
              )
            }
            <ReactTooltip id="nav-link-rate" place="bottom">Rate HitUP in Chrome Web Store</ReactTooltip>

            <a href='http://github.com/wonderbeyond/HitUP'
               className="nav-link-item"
               data-tip data-for="nav-link-github"
               target='_blank'
               rel="noopener noreferrer">
               <GitHub width="18" height="18" />
            </a>
            <ReactTooltip id="nav-link-github" place="bottom">View source on GitHub</ReactTooltip>

            {
              !isRunningExtension && (
                <a href='https://chrome.google.com/webstore/detail/hitup-find-top-things/eiokaohkigpbonodjcbjpecbnccijkjb'
                   className="d-none d-md-block nav-link-item"
                   data-tip data-for="nav-link-extension"
                   target='_blank'
                   rel="noopener noreferrer">
                   <Chrome width="18" height="18" />
                </a>
              )
            }
            <ReactTooltip id="nav-link-extension" place="bottom">Get HitUP as Chrome extension</ReactTooltip>

            <a href={ `https://twitter.com/intent/tweet?text=${this.tweet}` }
               data-tip data-for="nav-link-tweet"
               target='_blank'
               rel="noopener noreferrer"
               className="nav-link-item">
               <Twitter width="18" height="18" />
            </a>
            <ReactTooltip id="nav-link-tweet" place="bottom">Share HitUP on Twitter</ReactTooltip>

            <Link to="/comments"
              className="nav-link-item"
              data-tip data-for="nav-link-discuss"
              rel="noopener noreferrer">
              <Comments width="18" height="18" />
            </Link>
            <ReactTooltip id="nav-link-discuss" place="bottom">Let's discuss here</ReactTooltip>
          </div>

          {this.state.hitGem && <div className="gemmy-words d-none d-md-block">
            <span data-tip data-for="gemmy-words-tooltip" dangerouslySetInnerHTML={{__html: snarkdown(this.state.hitGem.content || "Mew~")}}></span>
            <ReactTooltip id="gemmy-words-tooltip" place="top"
              delayHide={200}
              delayShow={200}
              delayUpdate={200}>
              Powered by <a target='_blank' rel="noopener noreferrer" href="https://github.com/wonderbeyond/gemmy">wonderbeyond/gemmy</a>.<br/>
              You are welcome to contribute items. ❤️❤️❤️<br/>
              <Link to="/comments">Any ideas or questions?</Link>
            </ReactTooltip>
          </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    theme: store.preference.theme,
  };
};

const mapDispatchToProps = {
  setColorTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
