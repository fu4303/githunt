// import ReactGA from 'react-ga';
import {
  DISMISS_USER_TIP,
} from "./types";


export function dismissUserTip(tipID) {
  return dispatch => {
    dispatch({
      type: DISMISS_USER_TIP,
      payload: tipID
    });
  };
}
