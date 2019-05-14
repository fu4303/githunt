import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {ReactComponent as Table} from 'icons/table.svg';
import {ReactComponent as List} from 'icons/list.svg';

import './styles.scss';

class ViewFilter extends React.Component {
  state = {};

  changeSelected = (viewType) => {
    if (this.props.selectedViewType !== viewType) {
      this.props.updateViewType(viewType);
    }
  };

  render() {
    return (
      <div className="view-type-wrap">
        <div className="view-type btn shadowed cursor-default">
          <button onClick={ () => this.changeSelected('grid') } className={ classNames({ active: this.props.selectedViewType === 'grid' }) }>
            <Table width="14" height="14" className="mr-2" />
            <span>Grid</span>
          </button>
          <button onClick={ () => this.changeSelected('list') } className={ classNames({ active: this.props.selectedViewType === 'list' }) }>
            <List width="14" height="14" className="mr-2" />
            <span>List</span>
          </button>
        </div>
      </div>
    );
  }
}

ViewFilter.propTypes = {
  updateViewType: PropTypes.func.isRequired,
  selectedViewType: PropTypes.string,
};

export default ViewFilter;
