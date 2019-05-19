import {
  UPDATE_DATE_TYPE,
  UPDATE_LANGUAGE,
  UPDATE_VIEW_TYPE,
  SET_COLOR_THEME,
  SET_WHETHER_OCCUPY_NEWTAB,
} from './types';

const initialState = {
  whether_occupy_newtab: true,
  theme: 'light',

  // used for repo lists
  viewType: 'grid',
  dateJump: 'week',
  language: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATE_TYPE:
      return {
        ...state,
        dateJump: action.payload
      };
    case UPDATE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_COLOR_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_WHETHER_OCCUPY_NEWTAB:
      return {
        ...state,
        whether_occupy_newtab: action.payload
      };
    default:
      return state;
  }
}
