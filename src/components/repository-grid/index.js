import React from 'react';
import PropTypes from 'prop-types';
import GridItem from './grid-item';

class RepositoryGrid extends React.Component {
  render() {
    return (
      <div className="row grid-container mt-3" style={{padding: "0 5px"}}>
        { this.props.repositories.map(repository => <GridItem dateJump={ this.props.dateJump } repository={ repository } key={ repository.url }/>) }
      </div>
    );
  }
}

RepositoryGrid.propTypes = {
  repositories: PropTypes.array.isRequired,
  dateJump: PropTypes.string.isRequired
};

export default RepositoryGrid;
