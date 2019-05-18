import React from 'react';
import PropTypes from 'prop-types';
import {trendingPeriodDefs} from 'lib/gh-trending';

import './styles.css';

class GroupHeading extends React.Component {
  getTitle() {
    return "GitHub Trending Repos"
  }

  getSubtitle() {
    let periodText = trendingPeriodDefs[this.props.dateJump].heading;
    return `${periodText}`;
  }

  render() {
    return (
      <div className="group-heading">
        <span className="text-capitalizes">{ this.getTitle() }</span>
        <span className="small text-muted ml-2">
          { this.getSubtitle() }
        </span>
      </div>
    );
  }
}

GroupHeading.propTypes = {
  dateJump: PropTypes.oneOf(['week', 'month', 'year', 'day'])
};

export default GroupHeading;
