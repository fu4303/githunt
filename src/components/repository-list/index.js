import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import ListItem from './list-item';
import GroupHeading from '../group-heading';
import RepositoryGrid from '../repository-grid';

class RepositoryList extends React.Component {

  renderGroup(repositoryGroup, counter) {
    let groupHeading = '';
    // for the first repository group, we have the
    // heading among the filters out of the grid
    if (counter !== 0) {
      groupHeading = (
        <div className="row row-group">
          <GroupHeading
            start={ repositoryGroup.start }
            end={ repositoryGroup.end }
            dateJump={ this.props.dateJump }
          />
        </div>
      );
    }

    const groupKey = `${repositoryGroup.start}_${repositoryGroup.end}_${counter}`;
    const repositories = repositoryGroup.data.items;

    return (
      <div key={ groupKey } data-group-key={ groupKey }>
        { groupHeading }
        <div className="row list-container">
          { repositories.map(repository => <ListItem repository={ repository } key={ repository.id }/>) }
        </div>
      </div>
    );
  }

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
