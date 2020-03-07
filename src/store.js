import { combineReducers, applyMiddleware, createStore } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLocalStorage from 'redux-persist/lib/storage';
import createChromeStorage from 'redux-persist-chrome-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {isRunningChromeExtension} from 'lib/runtime';
import * as reducers from './redux/reducers';

const preferredStorage = isRunningChromeExtension ? createChromeStorage(window.chrome, 'sync') : reduxLocalStorage;

const rootReducer = combineReducers({
  'accounts': reducers.accounts,
  'preference': reducers.preference,
  'userData': persistReducer(
    {
      key: 'hitup:user-data',
      storage: preferredStorage,
      timeout: null,
      blacklist: [],
      stateReconciler: autoMergeLevel2,
    },
    reducers.userData
  ),
});

const persistedRootReducer = persistReducer(
  {
    key: 'hitup:root',
    storage: preferredStorage,
    timeout: null,
    whitelist: ['preference', 'accounts'],
    // blacklist: ['userData'],
    stateReconciler: autoMergeLevel2,
  },
  rootReducer,
);

export const store = createStore(persistedRootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persist = persistStore(store);
