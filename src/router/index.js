import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import FeedContainer from '../containers/feed';
import OptionsContainer from '../containers/options';
import CommentsContainer from '../containers/comments';

const AppRoutes = () => {
  return (
    // @todo use browser router and generate prerendered options.html page for chrome extension
    <HashRouter>
      <Switch>
        <Route exact path='/' component={ FeedContainer }/>
        <Route exact path='/options' component={ OptionsContainer }/>
        <Route exact path='/comments' component={ CommentsContainer }/>
        <Route component={ FeedContainer }/>
      </Switch>
    </HashRouter>
  );
};

export default AppRoutes;
