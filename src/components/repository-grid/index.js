import React from 'react';
import PropTypes from 'prop-types';

import GridItem from './grid-item';
import './styles.css';

class RepositoryGrid extends React.Component {
  render() {
    return (
      <div className="repositories-grid">
        <div className="row grid-container">
          { this.props.repositories.map(repository => <GridItem dateJump={ this.props.dateJump } repository={ repository } key={ repository.url }/>) }
        </div>
      </div>
    );
  }
}

RepositoryGrid.propTypes = {
  repositories: PropTypes.array.isRequired,
  dateJump: PropTypes.string.isRequired
};

export default RepositoryGrid;
