import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Launcher from './components/launcher';
import { persist, store } from './store';
import AppRoutes from './router';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={ <Launcher/> } persistor={ persist }>
          <PageWrapper/>
        </PersistGate>
      </Provider>
    );
  }
}

// for containing theme switch class
const PageWrapper = connect(store => ({
  preference: store.preference,
}))(props => <div className={`page-wrap theme-${props.preference.theme}`}><AppRoutes/></div>)

export default App;
