import React from 'react';
import PropTypes from 'prop-types';
import {trendingPeriodDefs} from 'lib/gh-trending';
import SimpleSelect from 'components/simple-select';
import {ReactComponent as Calendar} from 'icons/calendar.svg';

const TrendingPeriodFilter = (props) => <SimpleSelect
  decor={<Calendar width="15" height="15" className="mr-2" />}
  onChange={props.updateDateJump}
  value={props.selectedDateJump}
  options={
    Object.keys(trendingPeriodDefs).map(k => ({value: k, label: trendingPeriodDefs[k].heading}))
  } />

TrendingPeriodFilter.propTypes = {
  updateDateJump: PropTypes.func.isRequired,
  selectedDateJump: PropTypes.oneOf(Object.keys(trendingPeriodDefs)),
};

export default TrendingPeriodFilter;
