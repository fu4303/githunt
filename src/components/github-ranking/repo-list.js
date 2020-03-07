import React from 'react';
import PropTypes from 'prop-types';
// import ReactTooltip from 'react-tooltip';
import Star, {Stars} from 'icons/star';
import Fork from 'icons/fork';
import BuiltByMembers from "components/built-by-members";

import styles from './styles.module.scss';

class ListItem extends React.Component {
  render() {
    let itemKey = `${this.props.repository.owner.login}/${this.props.repository.name}`;
    let periodStarsTargetID = `${itemKey}:period-stars`;

    return (
      <div className={`col-12 ${styles.listItemContainer}`}>
        <div className={`${styles.repoHeader}`}>
          <h3>

            <a href={ `https://github.com/${this.props.repository.owner.login}` } rel="noopener noreferrer" target="_blank">
              { this.props.repository.owner.login }
            </a>
            <span className={`${styles.textNormal} text-muted`}> / </span>
            <a href={ this.props.repository.url } rel="noopener noreferrer" target="_blank">
              { this.props.repository.name }
            </a>
          </h3>
          {this.props.repository.builtBy && this.props.repository.builtBy.length > 0 && <div className={`${styles.repoMeta} text-muted small`}>Built by
            <BuiltByMembers repository={this.props.repository} members={this.props.repository.builtBy}/>
          </div>}
        </div>
        <div className={`${styles["repo-body"]}`}>
          <p>{ this.props.repository.description || 'No description given.' }</p>
        </div>
        <div className={`${styles["repo-footer"]}`}>
            {
              this.props.repository.primaryLanguage && (
                <span className={`d-inline-block mr-3`}>
                  <span className={`${styles["repo-language-color"]} ml-0`} style={{
                    backgroundColor: this.props.repository.primaryLanguage.color
                  }}></span>
                  &nbsp;{this.props.repository.primaryLanguage.name}
                </span>
              )
            }
            <a className="muted-link d-inline-block mr-3"
               href={ `${this.props.repository.url}/stargazers` }
               rel="noopener noreferrer"
               target="_blank">
              <Star/>
              { this.props.repository.stargazers.totalCount }
            </a>
            <a className="muted-link d-inline-block mr-3"
               href={ `${this.props.repository.url}/network/members` }
               rel="noopener noreferrer"
               target="_blank">
              <Fork/>
              { this.props.repository.forkCount }
            </a>
          </div>

        <a href={ `https://github.com/${this.props.repository.owner.login}` }
           target="_blank"
           rel="noopener noreferrer"
           className={`${styles["author-link"]} d-none d-lg-block d-xl-block d-md-block`}>
          <img className={`${styles["author-img"]}`}
               src={ this.props.repository.owner.avatarUrl }
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


export default function RepositoryList(props) {
  return (
    <div className={`row px-4 py-4 mt-4 mx-0 ${styles.repoListContainer}`}>
      {
        props.repositories.map(repository => <ListItem repository={repository} key={repository.url} />)
      }
    </div>
  );
}

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
};
