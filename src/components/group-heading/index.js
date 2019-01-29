import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './styles.css';

class GroupHeading extends React.Component {
  getTitle() {
    return "The most exciting from GitHup " + {
      'day': 'today',
      'week': 'this week',
      'month': 'this month',
    }[this.props.dateJump]
  }

  getSubtitle() {
    const startMoment = moment(this.props.start);
    const endMoment = moment(this.props.end);

    if (startMoment.isSame(endMoment, 'day') || this.props.dateJump === 'day') {
      return startMoment.format('MMMM D, YYYY');
    }

    return startMoment.format('MMMM D, YYYY') + ' – ' + endMoment.format('MMMM D, YYYY');
  }

  render() {
    return (
      <div className="group-heading">
        <h4>
          <span className="text-capitalizes">{ this.getTitle() }</span>
          {/* <span className="small text-muted ml-2">
            { this.getSubtitle() }
          </span> */}
        </h4>
      </div>
    );
  }
}

GroupHeading.propTypes = {
  dateJump: PropTypes.oneOf(['week', 'month', 'year', 'day'])
};

export default GroupHeading;
