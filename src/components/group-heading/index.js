import React from 'react';
import PropTypes from 'prop-types';
import {trendingPeriodDefs} from 'lib/gh-trending';

import './styles.css';

class GroupHeading extends React.Component {
  getTitle() {
    return "Trending repositories on GitHub"
  }

  getSubtitle() {
    let periodText = trendingPeriodDefs[this.props.dateJump].heading;
    return `${periodText}`;
  }

  render() {
    return (
      <div className="group-heading">
        <h4>
          <span className="text-capitalizes">{ this.getTitle() }</span>
          <span className="small text-muted ml-2">
            { this.getSubtitle() }
          </span>
        </h4>
      </div>
    );
  }
}

GroupHeading.propTypes = {
  dateJump: PropTypes.oneOf(['week', 'month', 'year', 'day'])
};

export default GroupHeading;
