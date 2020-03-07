import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PeriodIcon } from 'icons/period.svg';
import {realizePeriod} from 'lib/date-period';
import classNames from 'classnames';
import styles from './styles.module.scss';
import {format, isSameDay} from 'date-fns';
import ClickOutside from 'react-click-outside';

function toDateStr(d) {
  // only leave the date part
  if (!d) {return ''}
  if (typeof d === 'string') {
    return d.slice(0, 10)
  }
  return d.toISOString().slice(0, 10)
}

function formatPeriod(period) {
  if (period.spec) {
    return period.spec
  }
  return [format(period.start, 'YYYY-MM-DD'), format(period.end, 'YYYY-MM-DD')].join('~')
}

const RankingPeriodFilter = (props) => {
  let initPeriod;
  try {
    initPeriod = realizePeriod(props.value);
  } catch (e) {
    initPeriod = realizePeriod({spec: 'Last 3 Days'})
  }
  const [showDropdown, setShowDropdown] = useState(false);
  const [period, setPeriod] = useState({
    start: initPeriod.start,
    end: initPeriod.end,
    spec: initPeriod.spec,
  });

  const changeHandler = event => {
    const newPeriod = {
      ...period,
      [event.target.name]: event.target.value,
      spec: undefined,
    }
    setPeriod(newPeriod)
    props.onChange(newPeriod)
  }

  const quickSetPeriod = spec => () => {
    setPeriod(realizePeriod({spec}))
    props.onChange({spec})
    setShowDropdown(false)
  }

  return <ClickOutside onClickOutside={e => setShowDropdown(false)}>
    <div className={styles.wrapper}>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <PeriodIcon width="15" height="15" className="mr-2" />
        {formatPeriod(period)}
      </button>
      {showDropdown && <div className={classNames(styles.dropDown, 'p-3')}>
        {/* <h5>Created in this period</h5>
        <label>
          <span>Start Date</span>
          <input name="start" onChange={changeHandler} value={toDateStr(period.start)} type="date" />
        </label>
        <label>
          <span>End Date</span>
          <input name="end" onChange={changeHandler} value={toDateStr(period.end)} type="date" />
        </label> */}
        <div className={styles.descriptivePeriods}>
          <button onClick={quickSetPeriod('Past Day')}>Past Day</button>
          <button onClick={quickSetPeriod('Past Week')}>Past Week</button>
          <button onClick={quickSetPeriod('Past Month')}>Past Month</button>
          <button onClick={quickSetPeriod('Past Year')}>Past Year</button>
          <button onClick={quickSetPeriod('Last 3 Days')}>Last 3 Days</button>
          <button onClick={quickSetPeriod('Last 3 Weeks')}>Last 3 Weeks</button>
          <button onClick={quickSetPeriod('Last 3 Months')}>Last 3 Months </button>
          <button onClick={quickSetPeriod('Last 3 Years')}>Last 3 Years</button>
          <button onClick={quickSetPeriod('Total History')}>Total History</button>
        </div>
      </div>}
    </div>
  </ClickOutside>
}

RankingPeriodFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};

export default RankingPeriodFilter;
