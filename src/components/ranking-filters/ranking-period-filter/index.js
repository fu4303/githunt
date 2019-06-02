import React from 'react';
import PropTypes from 'prop-types';
import {trendingPeriodDefs} from 'lib/gh-trending';
import {ReactComponent as Calendar} from 'icons/calendar.svg';

const RankingPeriodFilter = (props) => <button>
  Last 24 Hours
</button>

RankingPeriodFilter.propTypes = {
  updateDateJump: PropTypes.func.isRequired,
  selectedDateJump: PropTypes.oneOf(Object.keys(trendingPeriodDefs)),
};

export default RankingPeriodFilter;
