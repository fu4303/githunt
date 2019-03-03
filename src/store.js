import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './redux/reducers';

const persistedReducers = persistReducer(
  {
    key: 'hitup:root',
    storage: storage,
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
