import React from 'react';
import GitHubTrending from 'components/github-trending';

import styles from './styles.module.scss';

function FeedContainer(props) {
  return (
    <div className="container pb-5">
      <div className={styles.listSwitcher}>
        <span className={`${styles.listItem} ${styles.A}`}></span>
        <span className={`${styles.listItem} ${styles.B}`}></span>
        <span className={`${styles.listItem} ${styles.C}`}></span>
      </div>

      <GitHubTrending />
    </div>
  )
}

export default FeedContainer;
