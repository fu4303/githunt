import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import moment from 'moment';
import Star, {HalfStar} from '../../icons/star';
import Fork from '../../icons/fork';
import Watcher from '../../icons/watcher';

class ListItem extends React.Component {
  render() {
    return (
      <div className="col-12 list-item-container">
        <div className="list-item-body">
          <div className="repo-header">
            <h3>
              <a href={ this.props.repository.html_url } rel="noopener noreferrer" target="_blank">
                <span className="text-normal">{ this.props.repository.owner.login } / </span>
                { this.props.repository.name }
              </a>
            </h3>
            <p className="repo-meta text-muted small">Built by &middot; <a href={ this.props.repository.owner.html_url } rel="noopener noreferrer" target="_blank">{ this.props.repository.owner.login }</a> &middot; { moment(this.props.repository.created_at).format('MMMM D YYYY') }</p>
          </div>
          <div className="repo-body">
            <p>{ this.props.repository.description || 'No description given.' }</p>
          </div>
          <div className="repo-footer">
            {
              this.props.repository.language && (
                <span className="d-inline-block mr-3">
                  {this.props.repository.languageColor && <span className="d-inline-block mr-3 repo-meta-language">
                    <span className="repo-language-color ml-0" style={{ backgroundColor: this.props.repository.languageColor }}></span>
                    &nbsp;{this.props.repository.language}
                  </span>}
                </span>
              )
            }
            <a className="muted-link d-inline-block mr-3"
               href={ `${this.props.repository.html_url}/stargazers` }
               rel="noopener noreferrer"
               target="_blank">
              <Star/>
              { this.props.repository.stars }
            </a>
            <a className="muted-link d-inline-block mr-3"
               href={ `${this.props.repository.html_url}/network/members` }
               rel="noopener noreferrer"
               target="_blank">
              <Fork/>
              { this.props.repository.forks.toLocaleString() }
            </a>
            <span style={{cursor: "help"}} className="text-muted d-inline-block mr-3" title={ `${this.props.repository.currentPeriodStars} stars ` + {
                'day': 'today',
                'week': 'this week',
                'month': 'this month',
              }[this.props.dateJump]}>
              <HalfStar/>
              { this.props.repository.currentPeriodStars }
            </span>
          </div>
        </div>

        <a href={ this.props.repository.owner.html_url }
           target="_blank"
           rel="noopener noreferrer"
           className="author-link d-none d-lg-block d-xl-block d-md-block">
          <img className='author-img'
               src={ this.props.repository.owner.avatar_url }
               onError={ (e) => {
                 e.target.src = '/img/logo.svg';
               } }
               alt={ this.props.repository.owner.login }/>
        </a>
      </div>
    );
  }
}

ListItem.propTypes = {
  repository: PropTypes.object.isRequired
};

export default ListItem;
