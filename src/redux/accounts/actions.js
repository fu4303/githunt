// import ReactGA from 'react-ga';
import {
  UPDATE_GITHUB_ACCESS_TOKEN
} from "./types";

export const updateGitHubAccessToken = function (token) {
  return dispatch => {
    dispatch({
      type: UPDATE_GITHUB_ACCESS_TOKEN,
      payload: token
    });
  };
};
