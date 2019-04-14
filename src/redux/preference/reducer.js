import { UPDATE_DATE_TYPE, UPDATE_LANGUAGE, UPDATE_OPTIONS, UPDATE_VIEW_TYPE } from './types';

let chrome = window.chrome;
let isChromeExt = chrome && chrome.storage && chrome.storage.sync;

let initialState = {
  viewType: 'grid',
  dateJump: 'week',
  language: '',
  options: {
    token: '',
  },
};

// if upgrated from previous version using localstorage for settings,
// migrate old settings to chrome.storage.sync
if (isChromeExt) {
  let persistKey = 'persist:hitup:root';
  let lsSettingsData = localStorage.getItem(persistKey);

  if (lsSettingsData) {
    initialState = JSON.parse(JSON.parse(lsSettingsData)['preference'])
    localStorage.removeItem(persistKey)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
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
    default:
      return state;
  }
}
