import React, { createRef, useState, useEffect } from "react";
import {parse as tomlParse}from 'toml';
import {isRunningExtension, isRunningChromeExtension} from 'lib/runtime';
import { connect } from 'react-redux';
import {dismissUserTip} from 'redux/user-data/actions';
import {CSSTransition} from 'react-transition-group';
import compareVersions from 'compare-versions';

import './styles.scss';

const TopTip = props => {
  const runtimeEnv = {
    version: process.env.REACT_APP_VERSION,
    stage: process.env.NODE_ENV,
    isMaintainer: document.location.search.indexOf('__as_maintainer') > 0,
    mediaWidth: window.innerWidth,
    isRunningExtension: isRunningExtension,
    isRunningChromeExtension: isRunningChromeExtension,
    isRunningPlainWeb: document.location.href.startsWith('http'),
  }

  const [activeTip, setActiveTip] = useState(null);
  const [inProp, setInProp] = useState(false);  // http://reactcommunity.org/react-transition-group/css-transition
  const tipRef = createRef();

  const matchDisplayCondition = tip => {
    // default returns true, unless there is an unmet condition
    // So, only returns false in branch conditon test!

    if (tip.disabled) {return false}

    const envReqs = tip.env_requires;

    if (envReqs.version) {
      // match version spec, e.g. ">=4.8.1"
      const mat = envReqs.version.match(/^(>=|<=|=|>|<)((\d+\.){2}\d+)$/);
      if (!mat) {
        console.error(`Invalid version spec: ${envReqs.version}`);
        return false;
      }
      const [op, verReq] = [mat[1], mat[2]];
      const cpmRes = compareVersions(runtimeEnv.version, verReq);
      const versionMet = (
        (op === '>'  && cpmRes >   0) ||
        (op === '>=' && cpmRes >=  0) ||
        (op === '='  && cpmRes === 0) ||
        (op === '<=' && cpmRes <=  0) ||
        (op === '<'  && cpmRes <   0)
      );
      console.debug(
        `Tip#${tip.id} requires(version${op}${verReq}), version=${runtimeEnv.version}, cmpRes: ${cpmRes}, met: ${versionMet}`
      );
      if (!versionMet) {return false}
    }

    if (envReqs.time) {
      const mat = envReqs.time.match(/^(>|<)(.+)$/);
      if (!mat) {
        console.error(`Invalid time spec: ${envReqs.time}`);
        return false;
      }
      const [op, timeReq] = [mat[1], new Date(mat[2])];
      const now = new Date()
      const timeMet = (
        (op === '>' && +now > +timeReq) ||
        (op === '<' && +now < +timeReq)
      );
      console.debug(
        `Tip#${tip.id} requires(time${op}${timeReq}), time=${now}, met: ${timeMet}`
      );
      if (!timeMet) {return false}
    }

    if (envReqs.use_time) {
      // match how long has current user been using this app
      // e.g. ">3 days"
      const unit2msec = {
        'seconds': 1000,
        'minutes': 1000*60,
        'hours': 1000*60*60,
        'days': 1000*60*60*24,
      }

      // eslint-disable-next-line no-useless-escape
      const mat = envReqs.use_time.match(/^(>|<)([\d\.]+) (seconds|minutes|hours|days)/);
      const [op, useTimeReq, unit] = [mat[1], mat[2], mat[3]];
      const useTimeReqInMsec = parseFloat(useTimeReq) * unit2msec[unit];
      const now = new Date();
      const firstSeenTime = new Date(props.firstSeenTime);
      const realUseTime = now - firstSeenTime;

      const useTimeMet = (
        (op === '>' && realUseTime > useTimeReqInMsec) ||
        (op === '<' && realUseTime < useTimeReqInMsec)
      )

      console.debug(
        `Tip#${tip.id} requires(useTime${op}${useTimeReq} ${unit}),` +
        ` realUseTime=${realUseTime/unit2msec[unit]} ${unit}, met: ${useTimeMet}`
      );

      if (!useTimeMet) {return false}
    }

    if (envReqs.stage && envReqs.stage !== runtimeEnv.stage) {
      console.debug(`Stage mismatch for Tip#${tip.id}`);
      return false;
    }

    if (envReqs.is_maintainer && !runtimeEnv.isMaintainer) {
      console.debug(`Tip#${tip.id} not to dispaly due to maintainer required`);
      return false;
    }

    if (envReqs.web_extension && !runtimeEnv.isRunningExtension) {
      console.debug(`Tip#${tip.id} not to dispaly due to require running as web extension`);
      return false;
    }

    if (envReqs.media_min_width && runtimeEnv.mediaWidth < envReqs.media_min_width) {
      console.debug(`Tip#${tip.id} not to dispaly due to mediaWidth>=${envReqs.media_min_width} required`);
      return false;
    }

    return true;
  }

  useEffect(() => {
      // I only want fetch tips while initial page load
      function fetchAndFeed() {
        fetch(
          process.env.REACT_APP_TOP_TIP_URL
        ).then(data => data.text()).then(text => {
          let parsed = tomlParse(text);
          console.debug(parsed);
          parsed.tips.some(tip => {
            if (props.dismissedUserTips.includes(tip.id)) {
              return false
            }
            if (matchDisplayCondition(tip)) {
              setActiveTip(tip)
              setInProp(true);
              return true;
            }
            return false;
          });
        })
      }

      setTimeout(fetchAndFeed, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (tipRef.current) {
      tipRef.current.addEventListener('click', event => {
        if (event.target.matches('a.action')) {
          dismiss();
          console.debug(`Closed tip#${activeTip.id} after user take action`)
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTip]);

  const dismiss = () => {
    setInProp(false);
    props.dismissUserTip(activeTip.id);
    setActiveTip(null);
  }

  return (
    <CSSTransition in={inProp} timeout={300} classNames="top-tip">
      {(activeTip && <div className="top-tip">
        <span ref={tipRef} className="message" dangerouslySetInnerHTML={{__html: activeTip.message}}></span>
        <span className="close" aria-hidden="true" onClick={dismiss}>&times;</span>
      </div>) || <div className="top-tip top-tip-empty">
        Mew~
      </div>}
    </CSSTransition>
  );
};

const mapStateToProps = store => {
  return {
    dismissedUserTips: store.userData.dismissedUserTips,
    firstSeenTime: store.userData.firstSeenTime,
  };
};

const mapDispatchToProps = {
  dismissUserTip
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTip);
