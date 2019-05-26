import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  getSelected() {
    for (let i = 0; i < this.props.options.length; i++) {
      const option = this.props.options[i];
      if (this.props.value === option.value) {
        return option
      }
    }
    throw new Error('Invalid option');
  }
  updateSelected = (option) => {
    if (option.value === this.getSelected().value) {
      return;
    }
    this.setState({ selected: option })
    this.props.onChange(option.value);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='shadowed'>
          {this.props.decor}<span>{this.getSelected().label}</span>
        </DropdownToggle>
        <DropdownMenu>
          {this.props.options.map(option =>
            <DropdownItem
              key={option.value}
              onClick={() => this.updateSelected(option)}>{option.label}</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

SimpleSelect.propTypes = {
  decor: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SimpleSelect;
