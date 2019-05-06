import {
  DISMISS_USER_TIP,
  EMPTY_DISMISSED_USER_TIPS,
} from './types';

const initialState = {
  dismissed_user_tips: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DISMISS_USER_TIP:
      let dismissed_user_tips = [...state.dismissed_user_tips] || [];
      if (!dismissed_user_tips.includes(action.payload)) {
        dismissed_user_tips.push(action.payload)
        if (dismissed_user_tips.length > 100) {
          dismissed_user_tips.shift()
        }
      }
      return {
        ...state,
        dismissed_user_tips
      };
    case EMPTY_DISMISSED_USER_TIPS:
      return {
        ...state,
        dismissed_user_tips: []
      };
    default:
      return state;
  }
}
