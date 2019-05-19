import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import ListItem from './list-item';
import RepositoryGrid from '../repository-grid';

class RepositoryList extends React.Component {
  render() {
    return (
      <div className="row list-container">
        {
          this.props.repositories.map(repository => <ListItem dateJump={ this.props.dateJump } repository={repository} key={repository.url} />)
        }
      </div>
    );
  }
}

RepositoryGrid.propTypes = {
  repositories: PropTypes.array.isRequired,
  dateJump: PropTypes.string.isRequired
};

export default RepositoryList;
