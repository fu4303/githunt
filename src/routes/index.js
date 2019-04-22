import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FeedContainer from '../containers/feed';
import CommentsContainer from '../containers/comments';
import withTracker from './with-tracker';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ withTracker(FeedContainer) }/>
      <Route exact path='/comments' component={ withTracker(CommentsContainer) }/>
      <Route component={ FeedContainer }/>
    </Switch>
  );
};

export default AppRoutes;
