import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import ListItem from './list-item';

export default function RepositoryList(props) {
  return (
    <div className={`row px-4 py-4 mt-4 mx-0 ${styles["list-container"]}`}>
      {
        props.repositories.map(repository => <ListItem dateJump={ props.dateJump } repository={repository} key={repository.url} />)
      }
    </div>
  );
}

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
  dateJump: PropTypes.string.isRequired
};
