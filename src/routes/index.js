import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FeedContainer from '../containers/feed';
import CommentsContainer from '../containers/comments';
import withTracker from './with-tracker';

const FeedContainerWithGATracker = withTracker(FeedContainer);

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ FeedContainerWithGATracker }/>
      {/* evaluate HOC wrapper in below can make a rerender after theme change */}
      <Route exact path='/comments' component={ withTracker(CommentsContainer) }/>
      <Route component={ FeedContainerWithGATracker }/>
    </Switch>
  );
};

export default AppRoutes;
