import React from 'react';
import GitHubTrending from 'components/github-trending';

import './styles.scss';

function FeedContainer(props) {
  return (
    <div className="container pb-5">
      <div className="list-switcher">
        <span className="list-item A"></span>
        <span className="list-item B"></span>
        <span className="list-item C"></span>
      </div>

      <GitHubTrending />
    </div>
  )
}

export default FeedContainer;
