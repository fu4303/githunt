import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import ReactTooltip from 'react-tooltip';
import {trendingPeriodDefs} from 'lib/gh-trending';
import Star, {Stars} from 'icons/star';
import Fork from 'icons/fork';
import BuiltByMembers from "components/built-by-members";

class ListItem extends React.Component {
  render() {
    let itemKey = `${this.props.repository.owner.login}/${this.props.repository.name}`;
    let periodStarsTargetID = `${itemKey}:period-stars`;

    return (
      <div className={`col-12 ${styles["list-item-container"]}`}>
        <div className={`${styles["repo-header"]}`}>
          <h3>
            <a href={ this.props.repository.html_url } rel="noopener noreferrer" target="_blank">
              <span className={`${styles["text-normal"]}`}>{ this.props.repository.owner.login } / </span>
              { this.props.repository.name }
            </a>
          </h3>
          {this.props.repository.builtBy && this.props.repository.builtBy.length > 0 && <div className={`${styles["repo-meta"]} text-muted small`}>Built by
            <BuiltByMembers repository={this.props.repository} members={this.props.repository.builtBy}/>
          </div>}
        </div>
        <div className={`${styles["repo-body"]}`}>
          <p>{ this.props.repository.description || 'No description given.' }</p>
        </div>
        <div className={`${styles["repo-footer"]}`}>
            {
              this.props.repository.language && (
                <span className="d-inline-block mr-3">
                  {this.props.repository.languageColor && <span className={`d-inline-block mr-3 ${styles["repo-meta"]}-language`}>
                    <span className={`${styles["repo-language-color"]} ml-0`} style={{ backgroundColor: this.props.repository.languageColor }}></span>
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
            <span style={{cursor: "help"}} className="text-muted d-inline-block mr-3" data-tip data-for={periodStarsTargetID}>
              <Stars />{`${this.props.repository.currentPeriodStars}`}
            </span>
            <ReactTooltip id={periodStarsTargetID} place="top" type="dark" effect="solid">
              {`${this.props.repository.currentPeriodStars} stars ${trendingPeriodDefs[this.props.dateJump].heading}`}
            </ReactTooltip>
          </div>

        <a href={ this.props.repository.owner.html_url }
           target="_blank"
           rel="noopener noreferrer"
           className={`${styles["author-link"]} d-none d-lg-block d-xl-block d-md-block`}>
          <img className={`${styles["author-img"]}`}
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
