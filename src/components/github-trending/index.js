import ReactGA from 'react-ga';
import React, { useState, useEffect } from 'react';
import Alert from 'components/alert';
import Loader from 'components/loader';
import TrendingFilters from 'components/trending-filters';
import { fetchTrendingRepositories } from 'lib/gh-trending';
import RepositoryList from 'components/repository-list';
import RepositoryGrid from 'components/repository-grid';
import { trendingPeriodDefs } from 'lib/gh-trending';
import {preferredStorage} from 'lib/storages';
import {prefetch} from 'lib/functools';
import './styles.scss';

const persistKey = 'HitUP:preference:GitHubTrending';
const loadPrefernce = prefetch(() => preferredStorage
.getItem(persistKey).then(data => {
  if (!data) {throw new Error('No data')}
  const parsed = JSON.parse(data);
  console.debug(`Loaded preference from ${persistKey}:`, parsed);
  return parsed;
})
.catch(reason => {
  console.debug('No data from new-style storage')
  return preferredStorage.getItem('persist:hitup:root').then(data => {
    // Migrate old preference data from redux-persist
    const globalPref = JSON.parse(JSON.parse(data).preference);
    return {
      language: globalPref.language,
      since: globalPref.dateJump,
      viewType: globalPref.viewType,
    }
  }).catch(reason => {
    console.debug('No data at all (ignored, maybe new user).');
  });
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
      label: `Set Trending ${item}`,
      action: `Trending ${item} Set to ${JSON.stringify(value)}`
    });
  }
  return { preference: state, setPreference }
}

function GitHubTrending(props) {
  const [state, setState] = useState({
    processing: true,
    repositories: [],
    error: null,
  });

  const { preference, setPreference } = usePreference({
    language: '',
    since: 'week',
    viewType: 'grid',
  }, {persistKey});

  // load trending data when:
  // - persisted preference done rehydrated
  // - language or since changeed
  useEffect(
    loadTrendingRepositories,
    [preference._rehydrated, preference.spokenLanguage, preference.language, preference.since]
  );

  function loadTrendingRepositories() {
    if (!preference._rehydrated) {
      return
    }
    const filters = {
      'spokenLanguage': preference.spokenLanguage,
      'language': preference.language,
      'dateJump': preference.since,
    };

    if (!state.processing) {
      // to ignore rerendering by wrap the if-condition test
      setState({
        processing: true,
        repositories: [],
        error: null
      });
    }

    fetchTrendingRepositories(filters).then(repositories => {
      if (!(repositories && repositories.length)) {
        throw new Error("Empty List")
      }

      setState({
        processing: false,
        repositories,
        error: null
      });
    }).catch(error => {
      let message = error.response &&
        error.response.data &&
        error.response.data.message;

      if (!message) {
        message = error.message;
      }

      setState({
        processing: false,
        repositories: [],
        error: message
      })
    });
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

  return (
    preference._rehydrated && <>
      <div className="header-row">
        <div className="group-heading">
          <span className="text-capitalizes">GitHub Trending Repos</span>
          <span className="small text-muted ml-2">
            {trendingPeriodDefs[preference.since].heading.toLocaleLowerCase()}
          </span>
        </div>

        <TrendingFilters
          selectedSpokenLanguage={preference.spokenLanguage || ""}
          selectedLanguage={(preference.language || "").toLocaleLowerCase()}
          selectedViewType={preference.viewType}
          updateLanguage={l => setPreference('language', l)}
          updateSpokenLanguage={l => setPreference('spokenLanguage', l)}
          updateViewType={vt => setPreference('viewType', vt)}
          updateDateJump={sc => setPreference('since', sc)}
          selectedDateJump={preference.since}
        />
      </div>
      <div className="body-row">
        {hasRepositories() && (
          preference.viewType === 'grid' ? <RepositoryGrid
            repositories={state.repositories}
            dateJump={preference.since}
          /> : <RepositoryList
              repositories={state.repositories}
              dateJump={preference.since}
            />
        )}
        {state.processing && <Loader />}
      </div>
      {!state.processing && !hasRepositories() && renderErrors()}
    </>
  );
}

export default GitHubTrending;
