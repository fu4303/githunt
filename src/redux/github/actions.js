import ReactGA from 'react-ga';
import axios from 'axios';

import {
  FETCH_TRENDING_FAILED,
  FETCH_TRENDING_SUCCESS,
  PROCESS_FETCH_TRENDING,
} from './types';

const TRENDING_API_URL = 'https://github-trending-api.now.sh/repositories';
// const TRENDING_API_URL = 'http://localhost:8080/repositories';

const transformFilters = (filters) => {
  const transformedFilters = {};

  // const startMoment = moment(filters.dateRange.start);
  // const endMoment = moment(filters.dateRange.end);
  // const reposDate = `created:${startMoment.format()}..${endMoment.format()}`;
  // const reposLanguage = filters.language ? `language:${filters.language} ` : '';

  if (filters.token) {
    transformedFilters.access_token = filters.token;
  }

  // transformedFilters.q = reposLanguage + reposDate;
  // transformedFilters.sort = 'stars';
  // transformedFilters.order = 'desc';

  transformedFilters.language = filters.language
  transformedFilters.since = {
    'week': 'weekly',
    'month': 'monthly',
    // 'year': '',
    'day': 'daily'
  }[filters.dateJump]

  return transformedFilters;
};

/**
 * @param {object} filters
 * @returns {Function}
 */
export const fetchTrending = function (filters) {
  return dispatch => {
    dispatch({ type: PROCESS_FETCH_TRENDING });

    axios.get(TRENDING_API_URL, {
      params: transformFilters(filters)
    }).then(response => {
      let reposities = response.data;

      if (!response.data || response.data.length < 1) {
        throw new Error('no response data.')
      }
      reposities.forEach((repo) => {
        let ownerLogin = repo.author;
        repo.html_url = repo.url;
        repo.owner = {
          login: ownerLogin,
          html_url: `https://github.com/${ownerLogin}`,
          avatar_url: `https://avatars.githubusercontent.com/${ownerLogin}?s=200&v=4`,
        }
      })
      dispatch({
        type: FETCH_TRENDING_SUCCESS,
        payload: reposities
      });
      ReactGA.event({
        category: 'API',
        label: 'Trending API Call',
        action: `Done Fetch from ${response.request.responseURL}`
      });
    }).catch(error => {
      let message = error.response &&
        error.response.data &&
        error.response.data.message;

      if (!message) {
        message = error.message;
      }

      dispatch({
        type: FETCH_TRENDING_FAILED,
        payload: message
      });

      ReactGA.exception({
        description: `Failed to Fetch Trending Data: ${message}. detail: ${JSON.stringify(error)}`,
        fatal: true
      });
    });
  };
};
