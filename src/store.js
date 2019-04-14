import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import reduxLocalStorage from 'redux-persist/lib/storage';
import createChromeStorage from 'redux-persist-chrome-storage'
import thunk from 'redux-thunk';

import rootReducer from './redux/reducers';

let chrome = window.chrome;
let isChromeExt = chrome && chrome.storage && chrome.storage.sync;

const persistedReducers = persistReducer(
  {
    key: 'hitup:root',
    storage: isChromeExt ? createChromeStorage(chrome, 'sync') : reduxLocalStorage,
    whitelist: ['preference'],
    stateReconciler: autoMergeLevel2,
  },
  rootReducer,
);

export const store = createStore(persistedReducers, composeWithDevTools(
  applyMiddleware(
    thunk,
  ),
));

export const persist = persistStore(store);
