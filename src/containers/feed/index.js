import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import TopNav from '../../components/top-nav';
import Filters from '../../components/filters';
import GroupHeading from '../../components/group-heading';
import { fetchTrending } from '../../redux/github/actions';
import RepositoryList from '../../components/repository-list';
import RepositoryGrid from '../../components/repository-grid';
import { updateDateJump, updateLanguage, updateViewType } from '../../redux/preference/actions';
import {trendingPeriodDefs} from 'lib/gh-trending';

class FeedContainer extends React.Component {
  componentDidMount() {
    const existingRepositories = this.props.github.repositories || [];

    // If there are no loaded repositories before, fetch them
    if (existingRepositories.length === 0) {
      this.loadTrendingRepositories();
    }
  }

  loadTrendingRepositories() {
    const filters = this.getFilters();
    this.props.fetchTrending(filters);
  }

  componentDidUpdate(prevProps) {
    const currPreferences = this.props.preference;
    const prevPreferences = prevProps.preference;

    // If language or dateJump has been updated, reload
    // the repositories
    if (currPreferences.language !== prevPreferences.language ||
      currPreferences.dateJump !== prevPreferences.dateJump) {
      this.loadTrendingRepositories();
    }
  }

  getFilters() {
    const filters = {};
    filters.language = this.props.preference.language;
    filters.token = this.props.preference.options.token;
    filters.dateJump = this.props.preference.dateJump
    return filters;
  }

  getCorrespondingGitHubLink() {
    return "https://github.com/trending/" +
      this.props.preference.language +
      "?since=" +
      trendingPeriodDefs[this.props.preference.dateJump].ghParamKey;
  }

  renderTokenWarning() {
    return !this.props.preference.options.token && (
      <Alert type='warning'>
        Make sure to
        <strong className='ml-1 mr-1'>
          <Link to='/options'>add a token</Link>
        </strong>
        to avoid hitting the rate limit
      </Alert>
    );
  }

  renderErrors() {
    if (!this.props.github.error) {
      return null;
    }

    let message = '';
    switch (this.props.github.error.toLowerCase()) {
      case 'bad credentials':
        message = (
          <span>
            Token is invalid, try <Link to='/options'>updating the token</Link> on the options page
          </span>
        );
        break;
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
        message = this.props.github.error;
        break;
    }

    return (
      <Alert type='warning' className="no-trending-data">
        {message}
      </Alert>
    );
  }

  renderAlerts() {
    const tokenWarning = this.renderTokenWarning();
    const error = this.renderErrors();

    if (tokenWarning || error) {
      return (
        <div className="alert-group">
          { tokenWarning }
          { error }
        </div>
      );
    }

    return null;
  }

  renderRepositoriesList() {
    if (this.props.preference.viewType === 'grid') {
      return <RepositoryGrid
        repositories={this.props.github.repositories || []}
        dateJump={this.props.preference.dateJump}
      />;
    }

    return <RepositoryList
      repositories={this.props.github.repositories || []}
      dateJump={this.props.preference.dateJump}
    />;
  }

  hasRepositories() {
    return this.props.github.repositories && this.props.github.repositories.length !== 0;
  }

  render() {
    return (
      <div className="page-wrap">
        <TopNav />

        <div className="container mb-5 pb-4">
          <div className="header-row clearfix">
            <GroupHeading
              dateJump={this.props.preference.dateJump}
              language={this.props.preference.language} />
            <div className="group-filters">
              <Filters
                selectedLanguage={this.props.preference.language}
                selectedViewType={this.props.preference.viewType}
                updateLanguage={this.props.updateLanguage}
                updateViewType={this.props.updateViewType}
                updateDateJump={this.props.updateDateJump}
                selectedDateJump={this.props.preference.dateJump}
              />
            </div>
          </div>
          <div className="body-row">
            {this.hasRepositories() && this.renderRepositoriesList()}
            {this.props.github.processing && <Loader />}
          </div>
          {!this.props.github.processing && !this.hasRepositories() && this.renderErrors()
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    preference: store.preference,
    github: store.github
  };
};

const mapDispatchToProps = {
  updateLanguage,
  updateViewType,
  updateDateJump,
  fetchTrending
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
