import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {trendingPeriodDefs} from 'lib/gh-trending';
import {ReactComponent as Calendar} from 'icons/calendar.svg';

import './styles.scss';

class DateJumpFilter extends React.Component {
  state = {
    dropdownOpen: false
  };

  updateDateJump = (dateJump) => {
    if (dateJump === this.props.selectedDateJump) {
      return;
    }

    this.props.updateDateJump(dateJump);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  getSelectedDateJump() {
    return trendingPeriodDefs[this.props.selectedDateJump].heading
  }

  render() {
    return (
      <Dropdown className='date-jump-wrap' isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
        <DropdownToggle className='date-jump-type shadowed'>
          <Calendar width="15" height="15" className="mr-2" />
          <span>{ this.getSelectedDateJump() }</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={ () => this.updateDateJump('day') }>Today</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('week') }>This Week</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('month') }>This Month</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DateJumpFilter.propTypes = {
  updateDateJump: PropTypes.func.isRequired,
  selectedDateJump: PropTypes.string
};

export default DateJumpFilter;
