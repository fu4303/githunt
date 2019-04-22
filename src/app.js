import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HashRouter } from 'react-router-dom';
import TopNav from 'components/top-nav';

import Launcher from './components/launcher';
import { persist, store } from './store';
import AppRoutes from './routes';
import SideBar from "components/sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false
    };
  }

  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={ <Launcher/> } persistor={ persist }>
          <ThemeWrapper/>
        </PersistGate>
      </Provider>
    );
  }
}

const PageWrapper = props => (
  <div id="page-wrap">
    <HashRouter>
      <TopNav />
      <AppRoutes/>
    </HashRouter>
  </div>
)


const ThemeWrapper = connect(store => ({
  theme: store.preference.theme,
}))(props => (
  <div id="theme-wrap" className={`theme-${props.theme}`}>
    <SideBar/>
    <PageWrapper/>
  </div>
))

export default App;
