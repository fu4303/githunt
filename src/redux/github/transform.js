import { createTransform } from 'redux-persist';

const GithubTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    inboundState = inboundState || {};

    if (!(inboundState.repositories && inboundState.repositories.length)) {
      // reject to persist state with empty reposities
      return null
    }
    // Do not persist `processing` flag or `error` information,
    // as we want to start fresh on reload in such cases
    inboundState = {
      ...inboundState,
      processing: false,
      error: null
    };

    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    return { ...outboundState };
  },
  // define which reducers this transform gets called for.
  {
    whitelist: ['github']
  }
);

export default GithubTransform;
