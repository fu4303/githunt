import {
  DISMISS_USER_TIP,
  EMPTY_DISMISSED_USER_TIPS,
} from './types';

const initialState = {
  dismissedUserTips: [],
  firstSeenTime: (new Date()).toISOString(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DISMISS_USER_TIP:
      let dismissedUserTips = [...state.dismissedUserTips] || [];
      if (!dismissedUserTips.includes(action.payload)) {
        dismissedUserTips.push(action.payload)
        if (dismissedUserTips.length > 100) {
          dismissedUserTips.shift()
        }
      }
      return {
        ...state,
        dismissedUserTips
      };
    case EMPTY_DISMISSED_USER_TIPS:
      return {
        ...state,
        dismissedUserTips: []
      };
    default:
      return state;
  }
}
