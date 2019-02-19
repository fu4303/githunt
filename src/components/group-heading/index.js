import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class GroupHeading extends React.Component {
  getTitle() {
    return "Trending repositories on GitHub"
  }

  getSubtitle() {
    let periodText = {
      'day': 'today',
      'week': 'this week',
      'month': 'this month',
    }[this.props.dateJump];
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
