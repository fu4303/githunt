import React from 'react';
import Disqus from 'disqus-react';

import TopNav from 'components/top-nav';

// import './styles.css';

export default class CommentsContainer extends React.Component {
  render() {
    return (
      <>
        <TopNav />

        <div className="container">
          <Disqus.DiscussionEmbed shortname={"wonder-hitup"} config={{
            url: "https://hitup.wondertools.top/",
            identifier: "/",
            title: "HitUP - Find Top Things"
          }} />
        </div>
      </>
    );
  }
}
