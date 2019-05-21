import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import Filters from '../../components/filters';
import {fetchTrendingRepositories} from 'lib/gh-trending';
import RepositoryList from '../../components/repository-list';
import RepositoryGrid from '../../components/repository-grid';
import { updateDateJump, updateLanguage, updateViewType } from '../../redux/preference/actions';
import {trendingPeriodDefs} from 'lib/gh-trending';

class FeedContainer extends React.Component {
  state = {
    processing: false,
    repositories: [],
    error: null,
  }

  componentDidMount() {
    this.loadTrendingRepositories();
  }

  loadTrendingRepositories() {
    const filters = {
      'language': this.props.preference.language,
      'dateJump': this.props.preference.dateJump,
    };

    this.setState({
      repositories: [],
      processing: true,
      error: null
    });

    fetchTrendingRepositories(filters).then(repositories => {
      if (!(repositories && repositories.length)) {
        throw new Error("Empty List")
      }

      this.setState({
        repositories,
        processing: false,
        error: null
      });
    }).catch(error => {
      let message = error.response &&
        error.response.data &&
        error.response.data.message;

      if (!message) {
        message = error.message;
      }

      this.setState({
        processing: false,
        error: message
      })
    });
  }

  componentDidUpdate(prevProps) {
    const currPreferences = this.props.preference;
    const prevPreferences = prevProps.preference;

    if (currPreferences.language !== prevPreferences.language || currPreferences.dateJump !== prevPreferences.dateJump) {
      this.loadTrendingRepositories();
    }
  }

  getCorrespondingGitHubLink() {
    return "https://github.com/trending/" +
      this.props.preference.language +
      "?since=" +
      trendingPeriodDefs[this.props.preference.dateJump].ghParamKey;
  }

  renderErrors() {
    if (!this.state.error) {
      return null;
    }

    let message = '';
    switch (this.state.error.toLowerCase()) {
      case 'empty list':
        message = (
          <span>
            Trending repositories results are currently being dissected.
            This may be a few minutes. <a href={this.getCorrespondingGitHubLink()}>
            You can visit GitHub's trending page instead.</a>
          </span>
        );
        break;
      default:
        message = this.state.error;
        break;
    }

    return (
      <Alert type='warning' className="mt-3">
        {message}
      </Alert>
    );
  }

  hasRepositories() {
    return this.state.repositories && this.state.repositories.length !== 0;
  }

  render() {
    return (
      <div className="container pb-5">
        <div className="list-switcher">
          <span className="list-item A"></span>
          <span className="list-item B"></span>
          <span className="list-item C"></span>
        </div>

        <div className="header-row">
          <div className="group-heading">
            <span className="text-capitalizes">GitHub Trending Repos</span>
            <span className="small text-muted ml-2">
              { trendingPeriodDefs[this.props.preference.dateJump].heading }
            </span>
          </div>

          <Filters
            selectedLanguage={this.props.preference.language}
            selectedViewType={this.props.preference.viewType}
            updateLanguage={this.props.updateLanguage}
            updateViewType={this.props.updateViewType}
            updateDateJump={this.props.updateDateJump}
            selectedDateJump={this.props.preference.dateJump}
          />
        </div>
        <div className="body-row">
          {this.hasRepositories() && (
            this.props.preference.viewType === 'grid' ? <RepositoryGrid
              repositories={this.state.repositories}
              dateJump={this.props.preference.dateJump}
            /> : <RepositoryList
              repositories={this.state.repositories}
              dateJump={this.props.preference.dateJump}
            />
          )}
          {this.state.processing && <Loader />}
        </div>
        {!this.state.processing && !this.hasRepositories() && this.renderErrors()}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    preference: store.preference,
  };
};

const mapDispatchToProps = {
  updateLanguage,
  updateViewType,
  updateDateJump,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
