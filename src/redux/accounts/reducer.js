import {
  UPDATE_GITHUB_ACCESS_TOKEN
} from './types';

const initialState = {
  GitHubAccessToken: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GITHUB_ACCESS_TOKEN:
      return {
        ...state,
        GitHubAccessToken: action.payload
      };
    default:
      return state;
  }
}
