import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import ReactTooltip from 'react-tooltip';
import {trendingPeriodDefs} from 'lib/gh-trending';
import Star, {Stars} from 'icons/star';
import Fork from 'icons/fork';

// import {UncontrolledTooltip} from 'reactstrap';
import BuiltByMembers from "components/built-by-members";

class GridItem extends React.Component {
  render() {
    let itemKey = `${this.props.repository.owner.login}/${this.props.repository.name}`;
    let periodStarsTargetID = `${itemKey}:period-stars`;

    return (
      <div className={`col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ${styles['grid-item-container']}`}>
        <div className={styles['grid-item-body']}>
          <div className={`clearfix ${styles['author-header']}`}>
            <a href={ this.props.repository.owner.html_url } rel="noopener noreferrer" target="_blank">
              <div className={styles["author-img"]}>
                <img src={ this.props.repository.owner.avatar_url }
                     onError={ (e) => {
                       e.target.src = '/img/logo.svg';
                     } }
                     alt={ this.props.repository.owner.login }/>
              </div>
              <div className={styles["author-details"]}>
                <h5>{ this.props.repository.owner.login }</h5>
                <p className="small text-muted">View Profile</p>
              </div>
            </a>
          </div>
          <div className={styles["repo-header"]}>
            <h5>
              <a href={ this.props.repository.html_url } rel="noopener noreferrer" target="_blank">
                <span className={styles["repo-name"]}>{ this.props.repository.name }</span>
              </a>
            </h5>
            <div className={`${styles["repo-meta"]} text-muted small`}>
              {this.props.repository.languageColor && <span className={`d-inline-block mr-3`}>
                <span className={`${styles["repo-language-color"]} ml-0`} style={{backgroundColor: this.props.repository.languageColor}}></span>
                &nbsp;{ this.props.repository.language }
              </span>}
              {this.props.repository.builtBy && this.props.repository.builtBy.length > 0 && <span className="d-inline-block repo-meta-built-by">Built by
                <BuiltByMembers repository={this.props.repository} members={this.props.repository.builtBy}/>
              </span>}
            </div>
          </div>
          <div className={styles["repo-body"]}>
            <p>{ (this.props.repository.description && this.props.repository.description.slice(0, 140)) || 'No description given.' }</p>
          </div>
          <div className={styles["repo-footer"]}>
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
        </div>
      </div>
    );
  }
}

GridItem.propTypes = {
  repository: PropTypes.object.isRequired
};

export default GridItem;
