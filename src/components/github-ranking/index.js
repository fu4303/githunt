import ReactGA from 'react-ga';
import React, { useState, useEffect } from 'react';
import Alert from 'components/alert';
import Loader from 'components/loader';
import { connect } from 'react-redux';
import {
  updateGitHubAccessToken
} from 'redux/accounts/actions';

import RankingFilters from 'components/ranking-filters';
import { fetchTrendingRepositories } from 'lib/gh-trending';
import RepositoryList from './repo-list';
import { trendingPeriodDefs } from 'lib/gh-trending';
import {preferredStorage} from 'lib/storages';
import {prefetch} from 'lib/functools';
import {ReactComponent as GitHub} from 'icons/github-brands.svg';
import styles from './styles.module.scss';
import repoSearch from 'lib/gh-repo-search';

const persistKey = 'HitUP:preference:GitHubRanking';
const loadPrefernce = prefetch(() => preferredStorage
.getItem(persistKey).then(data => {
  if (!data) {throw new Error('No data')}
  const parsed = JSON.parse(data);
  console.debug(`Loaded preference from ${persistKey}:`, parsed);
  return parsed;
})
.catch(reason => {
  console.debug('No data from new-style storage')
  return null;
}))


function usePreference(initial = {}, options = {}) {
  /**
   * Component-level persistable preference management
   *
   * I believe not every state is suitable to persist,
   * So this hook helps you maintain the part of persistable-
   * states (i.e. preference) independently.
  **/

  initial._rehydrated = false;
  const {persistKey} = options;
  if (!persistKey) {throw new Error('persistKey required')}
  const [state, update] = useState(initial);
  // const [storageChecked, setStorageChecked] = useState(false);

  // for loading preference from storage
  if (!state._rehydrated) {
    loadPrefernce().then(pref => {
      update({...state, ...pref, _rehydrated: true});
    })
  }

  function setPreference(item, value) {
    const newState = { ...state, [item]: value };
    update(newState);
    preferredStorage.setItem(persistKey, JSON.stringify(newState));
    ReactGA.event({
      category: 'Preference',
      label: `Set Ranking ${item}`,
      action: `Ranking ${item} Set to ${JSON.stringify(value)}`
    });
  }
  return { preference: state, setPreference }
}

function GitHubRanking(props) {
  const [state, setState] = useState({
    processing: true,
    repositories: [],
    error: null,
    after: null,
  });

  const { preference, setPreference } = usePreference({
    // viewType: 'grid',

    createdPeriod: {spec: 'Last 3 Days'},
    language: '',
    qwords: '',
    fork: true,
    first: 30,
    searchIn: ['name', 'description'],
    topic: null,
    license: null,

    sort: 'stars-desc',
  }, {persistKey});

  console.log('state.after:', state.after);
  console.log('preference:', preference);
  useEffect(
    loadRepos, [
      props.GitHubAccessToken,
      preference,
      state.after,
    ]
  );

  function loadRepos() {
    if (!preference._rehydrated) {
      return
    }

    if (!state.processing) {
      // to ignore rerendering by wrap the if-condition test
      setState({
        ...state,
        processing: true,
        repositories: [],
        error: null
      });
    }

    props.GitHubAccessToken && repoSearch({
      accessToken: props.GitHubAccessToken,
      qwords: preference.qwords,
      fork: preference.fork,
      first: preference.first,
      after: state.after,
      createdPeriod: preference.createdPeriod,
      searchIn: preference.searchIn,
      language: preference.language,
      topic: preference.topic,
      license: preference.license,
      sort: preference.sort,
    }).then(result => {
      const count = result.data.search.repositoryCount;
      const repositories = result.data.search.nodes;

      setState({
        ...state,
        processing: false,
        repositories,
        error: null
      });

      console.log(`Got ${count} repos:`, repositories);
    })
    // fetchTrendingRepositories(filters).then(repositories => {
    //   if (!(repositories && repositories.length)) {
    //     throw new Error("Empty List")
    //   }

    //   setState({
    //     processing: false,
    //     repositories,
    //     error: null
    //   });
    // }).catch(error => {
    //   let message = error.response &&
    //     error.response.data &&
    //     error.response.data.message;

    //   if (!message) {
    //     message = error.message;
    //   }

    //   setState({
    //     processing: false,
    //     repositories: [],
    //     error: message
    //   })
    // });
  }

  function getCorrespondingGitHubLink() {
    // Returns official trending link
    return "https://github.com/trending/" + preference.language +
      "?since=" +
      trendingPeriodDefs[preference.since].ghParamKey;
  }

  function renderErrors() {
    if (!state.error) {
      return null;
    }

    let message = '';
    switch (state.error.toLowerCase()) {
      case 'empty list':
        message = (
          <span>
            Trending repositories results are currently being dissected.
            This may be a few minutes. <a href={getCorrespondingGitHubLink()}>
              You can visit GitHub's trending page instead.</a>
          </span>
        );
        break;
      default:
        message = state.error;
        break;
    }

    return (
      <Alert type='warning' className="mt-3">
        {message}
      </Alert>
    );
  }

  function hasRepositories() {
    return state.repositories && state.repositories.length !== 0;
  }

  // pop access_token from url
  const cUrl = new URL(document.location.href);
  if (cUrl.searchParams.has('access_token')) {
    props.updateGitHubAccessToken(cUrl.searchParams.get('access_token'));
    cUrl.searchParams.delete('access_token');
    cUrl.searchParams.delete('oauth2_provider');
    cUrl.searchParams.delete('token_type');
    window.history.pushState({}, '', cUrl.href);
  }

  // display login button if no access_token
  if (!props.GitHubAccessToken) {
    function goOAuth2Flow() {
      const authUrl = `${process.env.REACT_APP_OAUTH2_MUX_SERVER}/github/authorize?redirect_uri=` + encodeURIComponent(document.location.href);
      document.location.href = authUrl;
    }
    return (
      <>
      <div className={styles.loginGitHubTip}>
        <p>Login is required to get advanced GitHub ranking.</p>
        <button onClick={goOAuth2Flow}>
          <GitHub width="24" height="24"></GitHub>
          &nbsp;&nbsp;Login GitHub
        </button>
      </div>
      <div className={styles.pasteTokenTip}>
        <p>Or you can <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
          generate a token</a> and paste below.</p>
          <input className={styles.tokenInput} type="text" onChange={e => props.updateGitHubAccessToken(e.target.value)}
            />
      </div>
      </>
    )
  }


  return (
    (preference._rehydrated) && <>
      <div className={styles.headerRow}>
        <div className={styles.groupHeading}>
          <span className={styles.textCapitalizes}>GitHub Advanced Ranking</span>
          <span className="small text-muted ml-2"></span>
        </div>

        <RankingFilters
          selectedLanguage={preference.language}
          // selectedViewType={preference.viewType}
          updateLanguage={l => setPreference('language', l)}
          // updateViewType={vt => setPreference('viewType', vt)}
          updateDatePeriod={sc => setPreference('createdPeriod', sc)}
          selectedDatePeriod={preference.createdPeriod}
        />
      </div>
      <div className="body-row">
        {hasRepositories() && <RepositoryList
          repositories={state.repositories}
          dateJump={preference.since}
        />}
        {state.processing && <Loader />}
      </div>
      {!state.processing && !hasRepositories() && renderErrors()}
    </>
  );
}

const mapStateToProps = store => {
  return {
    GitHubAccessToken: store.accounts.GitHubAccessToken,
  };
};

const mapDispatchToProps = {
  updateGitHubAccessToken
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHubRanking);
