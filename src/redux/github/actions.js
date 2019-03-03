import {fetchTrendingRepositories} from 'lib/gh-trending';

import {
  FETCH_TRENDING_FAILED,
  FETCH_TRENDING_SUCCESS,
  PROCESS_FETCH_TRENDING,
} from './types';

const transformFilters = (filters) => {
  const transformedFilters = {};

  if (filters.token) {
    transformedFilters.access_token = filters.token;
  }

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

    fetchTrendingRepositories(transformFilters(filters)).then(reposities => {
      if (!(reposities && reposities.length)) {
        throw new Error("Empty List")
      }
      dispatch({
        type: FETCH_TRENDING_SUCCESS,
        payload: reposities
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
    });
  };
};
