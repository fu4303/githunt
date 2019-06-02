import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GitHubTrending from 'components/github-trending';
import GitHubRanking from 'components/github-ranking';
import ReactTooltip from 'react-tooltip'

import styles from './styles.module.scss';

/**
 * @example
 * pathJoin('/', 'a/','/c/') => "/a/c/"
 */
export function pathJoin(...parts) {
  return parts.join('/').replace(/[/]+/g, '/')
}

function FeedContainer(props) {
  const baseURL = props.match.url;

  return (
    <div className="container pb-5">
      <div className={styles.listSwitcher}>
        <Link to={`${pathJoin(baseURL, "gh-trending")}`}
              className={`${styles.listItem} ${styles.A}`}
              data-tip="GitHub Trending Repositories" />

        <Link to={`${pathJoin(baseURL, "gh-ranking")}`}
              className={`${styles.listItem} ${styles.C}`}
              data-tip="GitHub Advanced Ranking (New)" />

        <ReactTooltip place="top" />
      </div>

      <Switch>
        <Route exact path={baseURL} component={ GitHubTrending }/>
        <Route exact path={pathJoin(baseURL, '/gh-trending')} component={ GitHubTrending }/>
        <Route exact path={pathJoin(baseURL, '/gh-ranking')} component={ GitHubRanking }/>
      </Switch>
    </div>
  )
}

export default FeedContainer;
