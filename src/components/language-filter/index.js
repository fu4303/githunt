import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';

import './styles.scss';
import {languages} from 'lib/github';
import {isMobileDevice} from 'lib/runtime';

import {ReactComponent as FilterSolid} from 'icons/filter-solid.svg';

class LanguageFilter extends React.Component {
  filterInputRef = React.createRef();

  state = {
    filterText: '',
    selectedIndex: 0,
    showDropdown: false
  };

  focusFilterInput = () => {
    this.filterInputRef.current.focus();
  };

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      this.ensureSelectedVisible()
    }, 0);
    if (this.state.showDropdown && !prevState.showDropdown && !isMobileDevice()) {
      this.focusFilterInput()
    }
  }

  ensureSelectedVisible() {
    const itemComponent = this.refs.activeItem;
    if (!itemComponent) {
      return;
    }

    const domNode = ReactDOM.findDOMNode(itemComponent);
    if (!domNode) {
      return;
    }

    domNode.scrollIntoView({
      behavior: "auto",
      block: "center"
    });
  }

  getFilteredLanguages() {
    let availableLanguages = [...languages];

    if (this.state.filterText) {
      availableLanguages = availableLanguages.filter(language => {
        const languageText = language.title.toLowerCase();
        const selectedText = this.state.filterText.toLowerCase();

        return languageText.indexOf(selectedText) >= 0;
      });
    }

    return availableLanguages;
  }

  renderLanguages() {
    let availableLanguages = this.getFilteredLanguages();

    return availableLanguages.map((language, counter) => {

      const isSelectedIndex = (
        this.props.selectedLanguage === language.value
      );

      // This will be used in making sure of the element visibility
      const refProp = isSelectedIndex ? { ref: 'activeItem' } : {};

      return (
        <a className={ classNames('select-menu-item', { 'active-item': isSelectedIndex }) }
           { ...refProp }
           onMouseDown={ () => this.selectLanguage(counter) }
           key={ counter }>
          <span className="select-menu-item-text">{ language.title }</span>
        </a>
      );
    });
  }

  onKeyDown = e => {
    const { selectedIndex } = this.state;

    const isEnterKey = e.keyCode === 13;
    const isUpKey = e.keyCode === 38;
    const isDownKey = e.keyCode === 40;

    if (!isUpKey && !isDownKey && !isEnterKey) {
      return;
    }

    const filteredLanguages = this.getFilteredLanguages();
    e.preventDefault();

    // arrow up/down button should select next/previous list element
    if (isUpKey && selectedIndex > 0) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex - 1
      }));
    } else if (isDownKey && selectedIndex < (filteredLanguages.length - 1)) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex + 1
      }));
    } else if (isEnterKey && filteredLanguages[selectedIndex]) {
      this.selectLanguage(selectedIndex);
    }
  };

  selectLanguage = (selectedIndex) => {
    let availableLanguages = this.getFilteredLanguages();
    if (this.props.selectedLanguage === (availableLanguages[selectedIndex].value)) {
      // selected prev language
      return
    }
    const filteredLanguages = this.getFilteredLanguages();
    const selectedLanguage = filteredLanguages[selectedIndex];
    if (!selectedLanguage) {
      return;
    }

    this.setState({
      selectedIndex: selectedIndex,
      filterText: '',
      showDropdown: false
    });

    this.props.updateLanguage(selectedLanguage.value);
  };

  hideDropdown = () => {
    this.setState({
      showDropdown: false,
      filterText: ''
    });
  };

  filterLanguages = (e) => {
    this.setState({
      filterText: e.target.value,
      selectedIndex: 0      // Reset and select the first language
    });
  };

  getLanguageDropdown() {
    return (
      <div className="language-select">
        <div className="select-menu-filters">
          <div className="select-menu-text-filter">
            <input type="text"
                   className="form-control"
                   placeholder="Filter Languages"
                   ref={ this.filterInputRef }
                   onChange={ this.filterLanguages }
                   onKeyDown={ this.onKeyDown }
            />
          </div>
        </div>
        <div className="select-menu-list">
          { this.renderLanguages() }
        </div>
      </div>
    );
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }));
  };

  render() {
    return (<ClickOutside onClickOutside={this.hideDropdown}>
      <div className='language-filter-wrap'>
        <button onClick={ this.toggleDropdown } className="btn btn-primary language-filter shadowed">
          <FilterSolid width="12" height="12" className="mr-2"/>
          <span>{ this.props.selectedLanguage || 'All Languages' }</span>
        </button>
        { this.state.showDropdown && this.getLanguageDropdown() }
      </div>
    </ClickOutside>);
  }
}

LanguageFilter.propTypes = {
  updateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string
};

export default LanguageFilter;
